import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Res,
  UseGuards,
  UnauthorizedException,
  ForbiddenException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { Role, UserStatus } from '@prisma/client';
import { PrismaService } from '../database/prisma.service.js';
import { Public } from '../common/decorators/public.decorator.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthUserDto, LoginResponseDto } from './dto/auth-user.dto.js';
import { PasswordService } from './password.service.js';
import { SessionService } from './session.service.js';
import { SessionAuthGuard, parseCookies } from './guards/session-auth.guard.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import {
  SESSION_COOKIE_NAME,
  CSRF_COOKIE_NAME,
  SESSION_TTL_MS,
} from './auth.constants.js';
import { ROLE_PERMISSIONS } from './auth.types.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Secure administrator sign-in.
   * Defends against timing attacks and account enumeration.
   */
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';
    const clientIp = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    let user: any = null;

    if (this.prisma.connected) {
      try {
        user = await this.prisma.user.findUnique({
          where: { email: loginDto.email.toLowerCase().trim() },
        });
      } catch {
        // Fall through to dummy verify
      }
    } else {
      // In-memory dev fallback when offline
      if (loginDto.email.toLowerCase() === 'admin.dev@aic-adt.org') {
        user = {
          id: 'dev-admin-uuid-001',
          email: 'admin.dev@aic-adt.org',
          fullName: 'Institutional Administrator',
          role: 'ADMIN',
          status: UserStatus.ACTIVE,
          passwordHash: 'scrypt$dummydev$hash',
        };
      }
    }

    // Timing-attack mitigation: execute password verify even if user is missing
    const dummyHash =
      'scrypt$e0f2b34a1c$9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e';
    const targetHash = user ? user.passwordHash : dummyHash;

    const isValid = await this.passwordService.verifyPassword(
      loginDto.password,
      targetHash,
    );

    // If user not found OR invalid password, return identical generic message
    if (!user || !isValid) {
      throw new UnauthorizedException('Invalid email address or password.');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new ForbiddenException(
        'Account is suspended or pending institutional verification.',
      );
    }

    // Create server-side session
    const { rawToken, csrfToken, expiresAt } =
      await this.sessionService.createSession(user.id, clientIp, userAgent);

    // Record login audit event
    if (this.prisma.connected) {
      await this.prisma.auditLog
        .create({
          data: {
            userId: user.id,
            action: 'AUTH_LOGIN_SUCCESS',
            resource: 'sessions',
            ipAddress: clientIp,
            userAgent,
            metadata: { email: user.email, role: user.role },
          },
        })
        .catch(() => {});
    }

    // Set secure HTTP-only session cookie
    res.cookie(SESSION_COOKIE_NAME, rawToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_TTL_MS,
    });

    // Set readable CSRF token cookie for double-submit protection
    res.cookie(CSRF_COOKIE_NAME, csrfToken, {
      httpOnly: false,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: SESSION_TTL_MS,
    });

    const permissions = [...(ROLE_PERMISSIONS[user.role as Role] ?? [])];

    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        status: user.status,
        permissions,
      },
      expiresAt: expiresAt.toISOString(),
    };
  }

  /**
   * Secure sign-out and session invalidation.
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ loggedOut: boolean }> {
    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';
    const cookies = parseCookies(req.headers.cookie);
    const token =
      cookies[SESSION_COOKIE_NAME] ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : undefined);

    if (token) {
      await this.sessionService.invalidateSession(token);
    }

    // Clear session and CSRF cookies
    res.clearCookie(SESSION_COOKIE_NAME, {
      path: '/',
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
    });

    res.clearCookie(CSRF_COOKIE_NAME, {
      path: '/',
      httpOnly: false,
      secure: isProduction,
      sameSite: 'lax',
    });

    return { loggedOut: true };
  }

  /**
   * Current authenticated user profile with active permissions.
   */
  @UseGuards(SessionAuthGuard)
  @Get('me')
  async getProfile(
    @CurrentUser() user: AuthUserDto,
  ): Promise<AuthUserDto> {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      status: user.status,
      permissions: user.permissions,
    };
  }
}

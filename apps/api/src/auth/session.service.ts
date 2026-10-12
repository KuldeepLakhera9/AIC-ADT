import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { randomBytes, createHash } from 'node:crypto';
import { Role, UserStatus } from '@prisma/client';
import { PrismaService } from '../database/prisma.service.js';
import { AppLoggerService } from '../common/logger/app-logger.service.js';
import { SESSION_TTL_MS } from './auth.constants.js';
import { AuthenticatedUser, ROLE_PERMISSIONS } from './auth.types.js';

interface InMemorySessionRecord {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

@Injectable()
export class SessionService {
  private readonly logger = new AppLoggerService('SessionService');
  // In-memory fallback map for unit testing and offline development
  private readonly memorySessions = new Map<string, InMemorySessionRecord>();

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Hashes a raw session token with SHA-256 for secure database lookup.
   */
  hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  /**
   * Generates a high-entropy random CSRF token.
   */
  generateCsrfToken(): string {
    return randomBytes(16).toString('hex');
  }

  /**
   * Creates an authoritative server-side session.
   */
  async createSession(
    userId: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ rawToken: string; csrfToken: string; expiresAt: Date; sessionId: string }> {
    const rawToken = randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(rawToken);
    const csrfToken = this.generateCsrfToken();
    const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

    let sessionId = `mem_${randomBytes(8).toString('hex')}`;

    try {
      if (this.prisma.connected) {
        const session = await this.prisma.session.create({
          data: {
            userId,
            tokenHash,
            expiresAt,
            ipAddress,
            userAgent,
          },
        });
        sessionId = session.id;
      } else {
        // Fallback to in-memory store
        this.memorySessions.set(tokenHash, {
          id: sessionId,
          userId,
          tokenHash,
          expiresAt,
          ipAddress,
          userAgent,
          createdAt: new Date(),
        });
      }
    } catch (err) {
      this.logger.warn(
        `Failed to persist session to database, falling back to memory store: ${err instanceof Error ? err.message : String(err)}`,
        'SessionService',
      );
      this.memorySessions.set(tokenHash, {
        id: sessionId,
        userId,
        tokenHash,
        expiresAt,
        ipAddress,
        userAgent,
        createdAt: new Date(),
      });
    }

    return { rawToken, csrfToken, expiresAt, sessionId };
  }

  /**
   * Validates a session token and returns the authenticated user with permissions.
   */
  async validateSession(rawToken: string): Promise<AuthenticatedUser> {
    if (!rawToken || typeof rawToken !== 'string') {
      throw new UnauthorizedException('Authentication required. Missing session token.');
    }

    const tokenHash = this.hashToken(rawToken);
    const now = new Date();

    let sessionExpiresAt: Date | null = null;

    if (this.prisma.connected) {
      try {
        const dbSession = await this.prisma.session.findUnique({
          where: { tokenHash },
          include: { user: true },
        });

        if (dbSession) {
          sessionExpiresAt = dbSession.expiresAt;

          if (sessionExpiresAt <= now) {
            await this.prisma.session.delete({ where: { tokenHash } }).catch(() => {});
            throw new UnauthorizedException('Session expired. Please sign in again.');
          }

          if (dbSession.user.status !== UserStatus.ACTIVE) {
            throw new ForbiddenException('Account is inactive, suspended, or pending verification.');
          }

          return {
            id: dbSession.user.id,
            email: dbSession.user.email,
            fullName: dbSession.user.fullName,
            role: dbSession.user.role,
            status: dbSession.user.status,
            permissions: [...(ROLE_PERMISSIONS[dbSession.user.role] ?? [])],
          };
        }
      } catch (err) {
        if (err instanceof UnauthorizedException || err instanceof ForbiddenException) {
          throw err;
        }
        // Fall through to memory check if DB threw an unexpected connection error
      }
    }

    // Memory store fallback
    const memSession = this.memorySessions.get(tokenHash);
    if (!memSession) {
      throw new UnauthorizedException('Invalid or expired session.');
    }

    if (memSession.expiresAt <= now) {
      this.memorySessions.delete(tokenHash);
      throw new UnauthorizedException('Session expired. Please sign in again.');
    }

    // Attempt to lookup user from database if available
    if (this.prisma.connected) {
      const user = await this.prisma.user.findUnique({
        where: { id: memSession.userId },
      });

      if (user) {
        if (user.status !== UserStatus.ACTIVE) {
          throw new ForbiddenException('Account is inactive, suspended, or pending verification.');
        }

        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          status: user.status,
          permissions: [...(ROLE_PERMISSIONS[user.role as Role] ?? [])],
        };
      }
    }

    // In-memory mock user for disconnected testing
    return {
      id: memSession.userId,
      email: 'admin.dev@aic-adt.org',
      fullName: 'Institutional Administrator',
      role: Role.ADMIN,
      status: 'ACTIVE',
      permissions: [...(ROLE_PERMISSIONS[Role.ADMIN] ?? [])],
    };
  }

  /**
   * Invalidates a single session by raw token.
   */
  async invalidateSession(rawToken: string): Promise<void> {
    if (!rawToken) return;
    const tokenHash = this.hashToken(rawToken);

    this.memorySessions.delete(tokenHash);

    if (this.prisma.connected) {
      try {
        await this.prisma.session.delete({ where: { tokenHash } }).catch(() => {});
      } catch {
        // Ignore not found errors during logout
      }
    }
  }

  /**
   * Revokes all active sessions for a user (e.g., password reset, suspension).
   */
  async invalidateAllUserSessions(userId: string): Promise<void> {
    for (const [key, record] of this.memorySessions.entries()) {
      if (record.userId === userId) {
        this.memorySessions.delete(key);
      }
    }

    if (this.prisma.connected) {
      try {
        await this.prisma.session.deleteMany({ where: { userId } });
      } catch {
        // Ignore database errors during mass revocation
      }
    }
  }
}

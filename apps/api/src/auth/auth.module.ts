import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../database/database.module.js';
import { PasswordService } from './password.service.js';
import { SessionService } from './session.service.js';
import { AuthController } from './auth.controller.js';
import { SessionAuthGuard } from './guards/session-auth.guard.js';
import { PermissionsGuard } from './guards/permissions.guard.js';
import { CsrfGuard } from './guards/csrf.guard.js';

@Module({
  imports: [ConfigModule, DatabaseModule],
  controllers: [AuthController],
  providers: [
    PasswordService,
    SessionService,
    SessionAuthGuard,
    PermissionsGuard,
    CsrfGuard,
  ],
  exports: [
    PasswordService,
    SessionService,
    SessionAuthGuard,
    PermissionsGuard,
    CsrfGuard,
  ],
})
export class AuthModule {}

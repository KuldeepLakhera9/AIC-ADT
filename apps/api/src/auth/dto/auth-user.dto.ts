import { Role } from '@prisma/client';
import { Permission } from '../auth.types.js';

export class AuthUserDto {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  status: string;
  permissions: Permission[];
}

export class LoginResponseDto {
  user: AuthUserDto;
  expiresAt: string;
}

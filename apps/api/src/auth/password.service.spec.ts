import { describe, it, expect, beforeEach } from 'vitest';
import { PasswordService } from './password.service.js';

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeEach(() => {
    passwordService = new PasswordService();
  });

  it('should hash a password with scrypt format', async () => {
    const rawPassword = 'SecureAdminPassword2026!';
    const hash = await passwordService.hashPassword(rawPassword);

    expect(hash).toMatch(/^scrypt\$[a-f0-9]{32}\$[a-f0-9]{128}$/);
    expect(hash).not.toContain(rawPassword);
  });

  it('should verify a correct password against its scrypt hash', async () => {
    const rawPassword = 'StrongPassword#123';
    const hash = await passwordService.hashPassword(rawPassword);

    const isValid = await passwordService.verifyPassword(rawPassword, hash);
    expect(isValid).toBe(true);
  });

  it('should reject an incorrect password', async () => {
    const rawPassword = 'CorrectPassword#123';
    const hash = await passwordService.hashPassword(rawPassword);

    const isValid = await passwordService.verifyPassword('WrongPassword#999', hash);
    expect(isValid).toBe(false);
  });

  it('should reject empty or malformed hashes safely', async () => {
    expect(await passwordService.verifyPassword('pwd', '')).toBe(false);
    expect(await passwordService.verifyPassword('pwd', 'invalid-format')).toBe(false);
    expect(await passwordService.verifyPassword('', 'scrypt$salt$hash')).toBe(false);
  });
});

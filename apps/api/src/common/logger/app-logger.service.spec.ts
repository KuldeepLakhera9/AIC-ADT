import { describe, it, expect } from 'vitest';
import { redactSensitiveData } from './app-logger.service.js';

describe('Sensitive Data Redaction', () => {
  it('should redact sensitive keys in nested objects', () => {
    const payload = {
      user: 'admin@aic-adt.com',
      password: 'SuperSecretPassword123!',
      credentials: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        apiKey: 'aic_live_9837498234',
        secret: 'top_secret_key',
      },
      metadata: {
        role: 'SUPER_ADMIN',
        loginCount: 5,
      },
    };

    const redacted = redactSensitiveData(payload);

    expect(redacted.password).toBe('[REDACTED]');
    expect(redacted.credentials.token).toBe('[REDACTED]');
    expect(redacted.credentials.apiKey).toBe('[REDACTED]');
    expect(redacted.credentials.secret).toBe('[REDACTED]');
    expect(redacted.user).toBe('admin@aic-adt.com');
    expect(redacted.metadata.role).toBe('SUPER_ADMIN');
    expect(redacted.metadata.loginCount).toBe(5);
  });

  it('should redact authorization headers and bearer tokens in strings', () => {
    const authHeader = 'Bearer eyJhbGciOiJIUzI1Ni...';
    const sanitized = redactSensitiveData(authHeader);
    expect(sanitized).toBe('Bearer [REDACTED]');
  });

  it('should redact database connection strings containing credentials', () => {
    const rawDbUrl =
      'postgresql://aic_admin:SuperSecretPass@db.internal.aic-adt.org:5432/aic_prod';
    const sanitized = redactSensitiveData(rawDbUrl);
    expect(sanitized).toBe(
      'postgresql://aic_admin:[REDACTED]@db.internal.aic-adt.org:5432/aic_prod',
    );
  });

  it('should handle arrays and primitive values cleanly', () => {
    expect(redactSensitiveData(null)).toBeNull();
    expect(redactSensitiveData(undefined)).toBeUndefined();
    expect(redactSensitiveData(42)).toBe(42);

    const arr = [{ password: '123' }, { email: 'test@example.com' }];
    const sanitizedArr = redactSensitiveData(arr);
    expect(sanitizedArr[0].password).toBe('[REDACTED]');
    expect(sanitizedArr[1].email).toBe('test@example.com');
  });
});

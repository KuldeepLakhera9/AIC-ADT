import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getFrontendConfig, validatePublicEnvironmentSafety } from '../env.ts';

describe('Frontend Environment Configuration & Security Guards', () => {
  it('should provide default fallback configurations for local development', () => {
    const config = getFrontendConfig();
    assert.ok(config.appUrl);
    assert.ok(config.apiUrl);
    assert.ok(['en', 'mr'].includes(config.defaultLocale));
    assert.strictEqual(typeof config.isProduction, 'boolean');
  });

  it('should prevent secret exposure in NEXT_PUBLIC_ variables', () => {
    // Should pass when no secrets are prefixed with NEXT_PUBLIC_
    assert.doesNotThrow(() => {
      validatePublicEnvironmentSafety();
    });
  });

  it('should throw explicit security violation if sensitive keyword is found in NEXT_PUBLIC_', () => {
    const originalSecret = process.env.NEXT_PUBLIC_DATABASE_PASSWORD;
    try {
      process.env.NEXT_PUBLIC_DATABASE_PASSWORD = 'illegal_leak_test';
      assert.throws(
        () => {
          validatePublicEnvironmentSafety();
        },
        {
          name: 'Error',
          message: /SECURITY VIOLATION/,
        },
      );
    } finally {
      delete process.env.NEXT_PUBLIC_DATABASE_PASSWORD;
      if (originalSecret !== undefined) {
        process.env.NEXT_PUBLIC_DATABASE_PASSWORD = originalSecret;
      }
    }
  });
});

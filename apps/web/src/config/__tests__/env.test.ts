import { describe, it, expect } from "vitest";
import { getFrontendConfig, validatePublicEnvironmentSafety } from "../env.ts";

describe("Frontend Environment Configuration & Security Guards", () => {
  it("should provide default fallback configurations for local development", () => {
    const config = getFrontendConfig();
    expect(config.appUrl).toBeTruthy();
    expect(config.apiUrl).toBeTruthy();
    expect(["en", "mr"]).toContain(config.defaultLocale);
    expect(typeof config.isProduction).toBe("boolean");
  });

  it("should prevent secret exposure in NEXT_PUBLIC_ variables", () => {
    // Should pass when no secrets are prefixed with NEXT_PUBLIC_
    expect(() => {
      validatePublicEnvironmentSafety();
    }).not.toThrow();
  });

  it("should throw explicit security violation if sensitive keyword is found in NEXT_PUBLIC_", () => {
    const originalSecret = process.env.NEXT_PUBLIC_DATABASE_PASSWORD;
    try {
      process.env.NEXT_PUBLIC_DATABASE_PASSWORD = "illegal_leak_test";
      expect(() => {
        validatePublicEnvironmentSafety();
      }).toThrow(/SECURITY VIOLATION/);
    } finally {
      delete process.env.NEXT_PUBLIC_DATABASE_PASSWORD;
      if (originalSecret !== undefined) {
        process.env.NEXT_PUBLIC_DATABASE_PASSWORD = originalSecret;
      }
    }
  });
});

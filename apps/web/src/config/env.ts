/**
 * AIC-ADT Baramati Foundation — Client & Server Environment Configuration
 *
 * Strict Security Guardrails:
 * 1. Only variables prefixed with NEXT_PUBLIC_ are ever transmitted to the browser bundle.
 * 2. Database credentials, internal API keys, and server secrets must NEVER be prefixed
 *    with NEXT_PUBLIC_ or accessed from client-rendered components.
 */

export interface FrontendConfig {
  appUrl: string;
  apiUrl: string;
  defaultLocale: 'en' | 'mr';
  isProduction: boolean;
  isDevelopment: boolean;
  isTest: boolean;
}

/**
 * Validates and retrieves application frontend environment configuration.
 */
export function getFrontendConfig(): FrontendConfig {
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const isProduction = nodeEnv === 'production';
  const isDevelopment = nodeEnv === 'development';
  const isTest = nodeEnv === 'test';

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (isProduction ? 'https://aic-adt.org' : 'http://localhost:3000');

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (isProduction ? 'https://api.aic-adt.org/api/v1' : 'http://localhost:4000/api/v1');

  const defaultLocaleRaw = process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en';
  const defaultLocale = defaultLocaleRaw === 'mr' ? 'mr' : 'en';

  return {
    appUrl,
    apiUrl,
    defaultLocale,
    isProduction,
    isDevelopment,
    isTest,
  };
}

/**
 * Asserts at build/runtime that no accidental secret leakage exists in NEXT_PUBLIC_ environment variables.
 * Throws an explicit build-time error if a server credential is found in public variables.
 */
export function validatePublicEnvironmentSafety(): void {
  const forbiddenPatterns = [
    /password/i,
    /secret/i,
    /private_key/i,
    /token/i,
    /database_url/i,
    /postgres/i,
  ];

  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith('NEXT_PUBLIC_') && typeof value === 'string') {
      for (const pattern of forbiddenPatterns) {
        if (pattern.test(key)) {
          throw new Error(
            `SECURITY VIOLATION: Public environment variable "${key}" contains sensitive keyword matching "${pattern}". Sensitive credentials must never be prefixed with NEXT_PUBLIC_.`,
          );
        }
      }
    }
  }
}

// Run public environment security validation upon module loading
if (process.env.NODE_ENV !== 'test') {
  validatePublicEnvironmentSafety();
}

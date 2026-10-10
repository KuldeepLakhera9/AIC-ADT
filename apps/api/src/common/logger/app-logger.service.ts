import { Injectable, LoggerService, LogLevel } from '@nestjs/common';

export const SENSITIVE_KEYS = [
  'password',
  'passwd',
  'pwd',
  'secret',
  'token',
  'accesstoken',
  'refreshtoken',
  'authorization',
  'auth',
  'cookie',
  'set-cookie',
  'databaseurl',
  'database_url',
  'db_password',
  'apikey',
  'api_key',
  'creditcard',
  'cvv',
  'ssn',
];

export function redactSensitiveData<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    // Redact Bearer tokens in strings
    let sanitized = obj.replace(
      /(Bearer\s+)[A-Za-z0-9._~+/-]+=*/gi,
      '$1[REDACTED]',
    );
    // Redact postgres:// or mongodb:// connection strings with passwords
    sanitized = sanitized.replace(
      /(postgres(?:ql)?:\/\/[^:]+:)[^@]+(@.+)/gi,
      '$1[REDACTED]$2',
    );
    return sanitized as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => redactSensitiveData(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase().replace(/[-_]/g, '');
      const isSensitive = SENSITIVE_KEYS.some((sensitive) =>
        lowerKey.includes(sensitive.toLowerCase().replace(/[-_]/g, '')),
      );

      if (isSensitive) {
        result[key] = '[REDACTED]';
      } else {
        result[key] = redactSensitiveData(value);
      }
    }
    return result as unknown as T;
  }

  return obj;
}

@Injectable()
export class AppLoggerService implements LoggerService {
  private readonly context: string;

  constructor(context = 'Application') {
    this.context = context;
  }

  private formatMessage(
    level: LogLevel,
    message: unknown,
    context?: string,
    correlationId?: string,
    metadata?: Record<string, unknown>,
  ): string {
    const logObject = {
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(),
      context: context || this.context,
      correlationId: correlationId || undefined,
      message:
        typeof message === 'string' ? message : redactSensitiveData(message),
      metadata: metadata ? redactSensitiveData(metadata) : undefined,
    };

    return JSON.stringify(logObject);
  }

  log(
    message: unknown,
    context?: string,
    correlationId?: string,
    metadata?: Record<string, unknown>,
  ) {
    process.stdout.write(
      this.formatMessage('log', message, context, correlationId, metadata) +
        '\n',
    );
  }

  error(
    message: unknown,
    trace?: string,
    context?: string,
    correlationId?: string,
    metadata?: Record<string, unknown>,
  ) {
    const errorMeta = {
      ...metadata,
      ...(trace ? { stack: trace } : {}),
    };
    process.stderr.write(
      this.formatMessage('error', message, context, correlationId, errorMeta) +
        '\n',
    );
  }

  warn(
    message: unknown,
    context?: string,
    correlationId?: string,
    metadata?: Record<string, unknown>,
  ) {
    process.stdout.write(
      this.formatMessage('warn', message, context, correlationId, metadata) +
        '\n',
    );
  }

  debug(
    message: unknown,
    context?: string,
    correlationId?: string,
    metadata?: Record<string, unknown>,
  ) {
    process.stdout.write(
      this.formatMessage('debug', message, context, correlationId, metadata) +
        '\n',
    );
  }

  verbose(
    message: unknown,
    context?: string,
    correlationId?: string,
    metadata?: Record<string, unknown>,
  ) {
    process.stdout.write(
      this.formatMessage('verbose', message, context, correlationId, metadata) +
        '\n',
    );
  }
}

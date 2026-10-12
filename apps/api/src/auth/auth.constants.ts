/**
 * AIC-ADT Baramati Foundation — Authentication & Session Constants
 */

export const SESSION_COOKIE_NAME = 'aic_session';
export const CSRF_COOKIE_NAME = 'aic_csrf';
export const CSRF_HEADER_NAME = 'x-csrf-token';

// Session lifetime: 8 hours (in milliseconds)
export const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

// Maximum failed login attempts before throttle
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOGIN_THROTTLE_TTL_SEC = 60;

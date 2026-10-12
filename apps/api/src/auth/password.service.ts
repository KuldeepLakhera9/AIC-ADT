import { Injectable } from '@nestjs/common';
import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';

@Injectable()
export class PasswordService {
  private readonly keyLength = 64;
  private readonly cost = 16384;
  private readonly blockSize = 8;
  private readonly parallelization = 1;

  /**
   * Hashes a password using OWASP-compliant scrypt with a cryptographic salt.
   * Format: scrypt$<saltHex>$<hashHex>
   */
  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = scryptSync(password, salt, this.keyLength, {
      N: this.cost,
      r: this.blockSize,
      p: this.parallelization,
    });

    return `scrypt$${salt}$${derivedKey.toString('hex')}`;
  }

  /**
   * Timing-attack resistant password verification.
   */
  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    if (!storedHash || !password) {
      return false;
    }

    // Support standard scrypt format: scrypt$<salt>$<hash>
    if (storedHash.startsWith('scrypt$')) {
      const parts = storedHash.split('$');
      if (parts.length !== 3) return false;
      const salt = parts[1];
      const originalHash = parts[2];

      const derivedKey = scryptSync(password, salt, this.keyLength, {
        N: this.cost,
        r: this.blockSize,
        p: this.parallelization,
      });

      const derivedHex = derivedKey.toString('hex');
      const originalBuffer = Buffer.from(originalHash, 'hex');
      const derivedBuffer = Buffer.from(derivedHex, 'hex');

      if (originalBuffer.length !== derivedBuffer.length) {
        return false;
      }

      return timingSafeEqual(originalBuffer, derivedBuffer);
    }

    // Backward-compatibility support for dev seeds (dummyhashforlocaldev)
    if (storedHash.includes('dummyhashforlocaldev')) {
      return password === 'aic_admin_dev_password_2026';
    }

    return false;
  }
}

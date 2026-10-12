import { describe, expect, it } from 'vitest';
import { BadRequestException } from '@nestjs/common';
import {
  detectMimeTypeFromBuffer,
  sanitizeAndValidateSvg,
  sanitizeFilename,
  validateUploadedFile,
} from './file-validator.util.js';

describe('File Validator Utility', () => {
  describe('detectMimeTypeFromBuffer', () => {
    it('detects PNG magic bytes', () => {
      const pngHeader = Buffer.from([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
      ]);
      expect(detectMimeTypeFromBuffer(pngHeader)).toBe('image/png');
    });

    it('detects JPEG magic bytes', () => {
      const jpegHeader = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10]);
      expect(detectMimeTypeFromBuffer(jpegHeader)).toBe('image/jpeg');
    });

    it('detects WebP magic bytes', () => {
      const webpHeader = Buffer.from('RIFF1234WEBPVP8 ');
      expect(detectMimeTypeFromBuffer(webpHeader)).toBe('image/webp');
    });

    it('detects PDF magic bytes', () => {
      const pdfHeader = Buffer.from('%PDF-1.7\n%test');
      expect(detectMimeTypeFromBuffer(pdfHeader)).toBe('application/pdf');
    });

    it('detects SVG XML text', () => {
      const svgBuffer = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>');
      expect(detectMimeTypeFromBuffer(svgBuffer)).toBe('image/svg+xml');
    });

    it('returns null for unknown/malformed signatures', () => {
      const randomBuffer = Buffer.from('MZ\x90\x00\x03\x00\x00\x00'); // DOS executable
      expect(detectMimeTypeFromBuffer(randomBuffer)).toBeNull();
    });
  });

  describe('sanitizeFilename', () => {
    it('removes directory traversal path characters', () => {
      const unsafe = '../../../etc/passwd.png';
      const clean = sanitizeFilename(unsafe);
      expect(clean).not.toContain('..');
      expect(clean).not.toContain('/');
      expect(clean).toBe('passwd.png');
    });

    it('removes control characters and null bytes', () => {
      const unsafe = 'test\x00\x1f\x7ffile.pdf';
      const clean = sanitizeFilename(unsafe);
      expect(clean).toBe('testfile.pdf');
    });

    it('truncates excessively long filenames', () => {
      const longName = 'a'.repeat(300) + '.jpg';
      const clean = sanitizeFilename(longName);
      expect(clean.length).toBeLessThanOrEqual(200);
      expect(clean.endsWith('.jpg')).toBe(true);
    });
  });

  describe('SVG security sanitization', () => {
    it('rejects SVGs containing script tags', () => {
      const maliciousSvg = Buffer.from('<svg><script>alert("xss")</script></svg>');
      expect(() => sanitizeAndValidateSvg(maliciousSvg)).toThrow(BadRequestException);
    });

    it('rejects SVGs containing onload inline handlers', () => {
      const maliciousSvg = Buffer.from('<svg onload="alert(1)"></svg>');
      expect(() => sanitizeAndValidateSvg(maliciousSvg)).toThrow(BadRequestException);
    });

    it('rejects SVGs containing javascript: pseudo-protocols', () => {
      const maliciousSvg = Buffer.from('<svg><a href="javascript:alert(1)"><circle /></a></svg>');
      expect(() => sanitizeAndValidateSvg(maliciousSvg)).toThrow(BadRequestException);
    });

    it('accepts clean SVGs without active content', () => {
      const cleanSvg = Buffer.from('<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red" /></svg>');
      expect(() => sanitizeAndValidateSvg(cleanSvg)).not.toThrow();
    });
  });

  describe('validateUploadedFile', () => {
    it('rejects unpermitted file extensions', () => {
      const file = {
        originalname: 'script.exe',
        buffer: Buffer.from('MZ\x00\x00'),
        mimetype: 'application/x-msdownload',
        size: 4,
      };
      expect(() => validateUploadedFile(file)).toThrow(BadRequestException);
    });

    it('rejects extension and content signature mismatch', () => {
      const file = {
        originalname: 'fake_photo.jpg',
        buffer: Buffer.from('%PDF-1.4 file pretending to be jpg'),
        mimetype: 'image/jpeg',
        size: 34,
      };
      expect(() => validateUploadedFile(file)).toThrow(BadRequestException);
    });

    it('rejects oversized images (> 10MB)', () => {
      // 10MB + 1 byte
      const bigBuffer = Buffer.alloc(10 * 1024 * 1024 + 1);
      // Valid PNG header
      bigBuffer.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

      const file = {
        originalname: 'large.png',
        buffer: bigBuffer,
        mimetype: 'image/png',
        size: bigBuffer.length,
      };
      expect(() => validateUploadedFile(file)).toThrow(BadRequestException);
    });

    it('accepts valid PNG image and returns metadata', () => {
      const pngBuffer = Buffer.from([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
        0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x00,
        0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xde,
      ]);

      const file = {
        originalname: 'valid_poster.png',
        buffer: pngBuffer,
        mimetype: 'image/png',
        size: pngBuffer.length,
      };

      const meta = validateUploadedFile(file);
      expect(meta.verifiedMimeType).toBe('image/png');
      expect(meta.extension).toBe('.png');
      expect(meta.isImage).toBe(true);
      expect(meta.checksumSha256).toBeDefined();
    });
  });
});

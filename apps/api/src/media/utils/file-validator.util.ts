import crypto from 'node:crypto';
import path from 'node:path';
import { BadRequestException } from '@nestjs/common';
import {
  ALL_ALLOWED_MIME_TYPES,
  ALLOWED_IMAGE_MIME_TYPES,
  ALLOWED_DOCUMENT_MIME_TYPES,
  EXTENSION_TO_MIME,
  MAX_DOCUMENT_FILE_SIZE,
  MAX_IMAGE_FILE_SIZE,
  MIME_TO_EXTENSION,
} from '../media.constants.js';

export interface ValidatedFileMetadata {
  sanitizedFilename: string;
  verifiedMimeType: string;
  extension: string;
  fileSizeBytes: number;
  checksumSha256: string;
  isImage: boolean;
  isDocument: boolean;
}

/**
 * Inspect magic bytes of buffer to verify actual content matches declared type.
 */
export function detectMimeTypeFromBuffer(buffer: Buffer): string | null {
  if (buffer.length < 4) return null;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'image/png';
  }

  // WebP: RIFF .... WEBP
  if (
    buffer.length >= 12 &&
    buffer.toString('utf8', 0, 4) === 'RIFF' &&
    buffer.toString('utf8', 8, 12) === 'WEBP'
  ) {
    return 'image/webp';
  }

  // PDF: %PDF-
  if (buffer.toString('utf8', 0, 5) === '%PDF-') {
    return 'application/pdf';
  }

  // SVG: text containing <svg
  const headerText = buffer.toString('utf8', 0, Math.min(buffer.length, 1024)).trim();
  if (
    (headerText.startsWith('<?xml') || headerText.startsWith('<svg')) &&
    headerText.includes('<svg')
  ) {
    return 'image/svg+xml';
  }

  return null;
}

/**
 * Sanitize an untrusted user-supplied filename.
 * Removes directory traversal, control characters, and reserved system characters.
 */
export function sanitizeFilename(originalName: string): string {
  const base = path.basename(originalName);
  // Remove null bytes and control chars (ASCII 0-31 and 127)
  let clean = base
    .split('')
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join('');
  // Remove path traversal and dangerous characters
  clean = clean.replace(/[/\\]/g, '');
  clean = clean.replace(/\.\.+/g, '.');
  // Allow only alphanumeric, dashes, underscores, and dots
  clean = clean.replace(/[^a-zA-Z0-9._-]/g, '_');
  // Limit length
  if (clean.length > 200) {
    const ext = path.extname(clean);
    clean = clean.slice(0, 190) + ext;
  }
  return clean || 'unnamed_file';
}

/**
 * Strict SVG security inspection.
 * Rejects SVGs containing executable JavaScript or embedded active content.
 */
export function sanitizeAndValidateSvg(buffer: Buffer): void {
  const content = buffer.toString('utf8').toLowerCase();

  const forbiddenPatterns = [
    '<script',
    '</script',
    'javascript:',
    'vbscript:',
    'onload=',
    'onerror=',
    'onclick=',
    'onmouseover=',
    'onfocus=',
    'onblur=',
    '<foreignobject',
    '<iframe',
    '<embed',
    '<object',
    'xmlns:xlink="http://www.w3.org/1999/xlink"',
  ];

  for (const pattern of forbiddenPatterns) {
    if (content.includes(pattern)) {
      throw new BadRequestException(
        `SVG file rejected: Prohibited active script or element detected (${pattern}).`,
      );
    }
  }
}

/**
 * Comprehensive server-side file inspection and validation.
 */
export function validateUploadedFile(
  file: {
    originalname: string;
    buffer: Buffer;
    mimetype: string;
    size: number;
  },
): ValidatedFileMetadata {
  if (!file || !file.buffer || file.buffer.length === 0) {
    throw new BadRequestException('Uploaded file is empty or missing.');
  }

  const rawExt = path.extname(file.originalname).toLowerCase();

  // 1. Check extension allowlist
  const expectedMimeFromExt = EXTENSION_TO_MIME[rawExt];
  if (!expectedMimeFromExt) {
    throw new BadRequestException(
      `File extension '${rawExt}' is not permitted. Allowed: .jpg, .jpeg, .png, .webp, .svg, .pdf`,
    );
  }

  // 2. Magic bytes content inspection
  const detectedMime = detectMimeTypeFromBuffer(file.buffer);
  if (!detectedMime) {
    throw new BadRequestException(
      'Malformed file: Server could not verify authentic file signature from content bytes.',
    );
  }

  // 3. Mismatch check
  if (detectedMime !== expectedMimeFromExt) {
    throw new BadRequestException(
      `File content signature (${detectedMime}) does not match declared extension (${rawExt}).`,
    );
  }

  if (
    !ALL_ALLOWED_MIME_TYPES.includes(
      detectedMime as (typeof ALL_ALLOWED_MIME_TYPES)[number],
    )
  ) {
    throw new BadRequestException(
      `MIME type '${detectedMime}' is not supported by the platform repository.`,
    );
  }

  const isImage = (ALLOWED_IMAGE_MIME_TYPES as readonly string[]).includes(
    detectedMime,
  );
  const isDocument = (ALLOWED_DOCUMENT_MIME_TYPES as readonly string[]).includes(
    detectedMime,
  );

  // 4. Size limits
  if (isImage && file.buffer.length > MAX_IMAGE_FILE_SIZE) {
    throw new BadRequestException(
      `Image file size exceeds maximum limit of 10 MB (received ${(file.buffer.length / (1024 * 1024)).toFixed(2)} MB).`,
    );
  }

  if (isDocument && file.buffer.length > MAX_DOCUMENT_FILE_SIZE) {
    throw new BadRequestException(
      `Document file size exceeds maximum limit of 50 MB (received ${(file.buffer.length / (1024 * 1024)).toFixed(2)} MB).`,
    );
  }

  // 5. SVG Sanitization
  if (detectedMime === 'image/svg+xml') {
    sanitizeAndValidateSvg(file.buffer);
  }

  // 6. Checksum and metadata
  const checksumSha256 = crypto
    .createHash('sha256')
    .update(file.buffer)
    .digest('hex');

  const sanitizedFilename = sanitizeFilename(file.originalname);
  const extension = MIME_TO_EXTENSION[detectedMime] || rawExt;

  return {
    sanitizedFilename,
    verifiedMimeType: detectedMime,
    extension,
    fileSizeBytes: file.buffer.length,
    checksumSha256,
    isImage,
    isDocument,
  };
}

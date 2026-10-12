export interface ImageDimensions {
  width: number | null;
  height: number | null;
}

/**
 * Extract image dimensions from verified image buffer.
 */
export function extractImageDimensions(
  buffer: Buffer,
  mimeType: string,
): ImageDimensions {
  try {
    switch (mimeType) {
      case 'image/png':
        return getPngDimensions(buffer);
      case 'image/jpeg':
        return getJpegDimensions(buffer);
      case 'image/webp':
        return getWebpDimensions(buffer);
      case 'image/svg+xml':
        return getSvgDimensions(buffer);
      default:
        return { width: null, height: null };
    }
  } catch {
    return { width: null, height: null };
  }
}

function getPngDimensions(buffer: Buffer): ImageDimensions {
  if (buffer.length < 24) return { width: null, height: null };
  // IHDR chunk: width is 4 bytes at offset 16, height is 4 bytes at offset 20
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

function getJpegDimensions(buffer: Buffer): ImageDimensions {
  let offset = 2; // Skip SOI (FF D8)
  const len = buffer.length;

  while (offset < len) {
    if (buffer[offset] !== 0xff) {
      break;
    }
    const marker = buffer[offset + 1];

    // SOF markers (Start of Frame)
    if (
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb) ||
      (marker >= 0xcd && marker <= 0xcf)
    ) {
      if (offset + 8 < len) {
        const height = buffer.readUInt16BE(offset + 5);
        const width = buffer.readUInt16BE(offset + 7);
        return { width, height };
      }
      break;
    }

    // Move to next marker
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
    } else {
      if (offset + 3 >= len) break;
      const markerLength = buffer.readUInt16BE(offset + 2);
      offset += 2 + markerLength;
    }
  }

  return { width: null, height: null };
}

function getWebpDimensions(buffer: Buffer): ImageDimensions {
  if (buffer.length < 30) return { width: null, height: null };

  const format = buffer.toString('utf8', 12, 16);

  // VP8 (lossy)
  if (format === 'VP8 ') {
    if (buffer.length >= 30) {
      const width = buffer.readUInt16LE(26) & 0x3fff;
      const height = buffer.readUInt16LE(28) & 0x3fff;
      return { width, height };
    }
  }

  // VP8L (lossless)
  if (format === 'VP8L') {
    if (buffer.length >= 25 && buffer[20] === 0x2f) {
      const b0 = buffer[21];
      const b1 = buffer[22];
      const b2 = buffer[23];
      const b3 = buffer[24];
      const width = 1 + (((b1 & 0x3f) << 8) | b0);
      const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
      return { width, height };
    }
  }

  // VP8X (extended)
  if (format === 'VP8X') {
    if (buffer.length >= 30) {
      const width =
        1 + (buffer[24] | (buffer[25] << 8) | (buffer[26] << 16));
      const height =
        1 + (buffer[27] | (buffer[28] << 8) | (buffer[29] << 16));
      return { width, height };
    }
  }

  return { width: null, height: null };
}

function getSvgDimensions(buffer: Buffer): ImageDimensions {
  const text = buffer.toString('utf8', 0, Math.min(buffer.length, 4096));

  // Try viewBox="minX minY width height"
  const viewBoxMatch = text.match(/viewBox\s*=\s*["'][\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)["']/i);
  if (viewBoxMatch) {
    const width = Math.round(parseFloat(viewBoxMatch[1]));
    const height = Math.round(parseFloat(viewBoxMatch[2]));
    if (!isNaN(width) && !isNaN(height)) {
      return { width, height };
    }
  }

  // Try width and height attributes
  const widthMatch = text.match(/width\s*=\s*["']([\d.]+)(?:px)?["']/i);
  const heightMatch = text.match(/height\s*=\s*["']([\d.]+)(?:px)?["']/i);
  if (widthMatch && heightMatch) {
    const width = Math.round(parseFloat(widthMatch[1]));
    const height = Math.round(parseFloat(heightMatch[1]));
    if (!isNaN(width) && !isNaN(height)) {
      return { width, height };
    }
  }

  return { width: null, height: null };
}

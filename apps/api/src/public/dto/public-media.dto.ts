export interface PublicMediaAssetDto {
  id: string;
  originalName: string;
  publicUrl: string;
  mimeType: string;
  fileSizeBytes: number;
  mediaType: string;
  width?: number | null;
  height?: number | null;
  altText: string;
  caption?: string | null;
  attribution?: string | null;
  createdAt: string;
}

import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { DocumentType, MediaType, MediaVisibility } from '@prisma/client';
import {
  ALLOWED_MEDIA_SORT_FIELDS,
  DEFAULT_MEDIA_LIMIT,
  DEFAULT_MEDIA_PAGE,
  MAX_MEDIA_LIMIT,
  type AllowedMediaSortField,
} from '../media.constants.js';

export class QueryMediaDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = DEFAULT_MEDIA_PAGE;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_MEDIA_LIMIT)
  limit?: number = DEFAULT_MEDIA_LIMIT;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  search?: string;

  @IsOptional()
  @IsEnum(MediaType)
  mediaType?: MediaType;

  @IsOptional()
  @IsEnum(MediaVisibility)
  visibility?: MediaVisibility;

  @IsOptional()
  @IsEnum(DocumentType)
  documentType?: DocumentType;

  @IsOptional()
  @IsIn(ALLOWED_MEDIA_SORT_FIELDS)
  sortBy?: AllowedMediaSortField = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';
}

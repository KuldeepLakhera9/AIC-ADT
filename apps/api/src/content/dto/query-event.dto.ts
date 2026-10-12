import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  IsEnum,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ContentStatus, EventCategory, EventStatus, VenueType } from '@prisma/client';
import {
  ALLOWED_EVENT_SORT_FIELDS,
  type AllowedEventSortField,
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  MAX_LIMIT,
} from '../content.constants.js';

export class QueryEventDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = DEFAULT_PAGE;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_LIMIT)
  limit: number = DEFAULT_LIMIT;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @IsOptional()
  @IsEnum(EventStatus)
  eventStatus?: EventStatus;

  @IsOptional()
  @IsEnum(EventCategory)
  category?: EventCategory;

  @IsOptional()
  @IsEnum(VenueType)
  venueType?: VenueType;

  @IsOptional()
  @IsIn(['en', 'mr'])
  locale?: string = 'en';

  @IsOptional()
  @IsIn(ALLOWED_EVENT_SORT_FIELDS)
  sortBy?: AllowedEventSortField = 'startDate';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'asc';
}

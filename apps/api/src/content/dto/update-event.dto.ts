import {
  IsString,
  IsEnum,
  IsOptional,
  IsISO8601,
  Matches,
  MaxLength,
  MinLength,
  IsIn,
  IsBoolean,
  IsArray,
  IsUrl,
} from 'class-validator';
import { EventCategory, EventStatus, VenueType } from '@prisma/client';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must contain only lowercase alphanumeric characters and single hyphens',
  })
  @MaxLength(100)
  slug?: string;

  @IsOptional()
  @IsEnum(EventCategory)
  category?: EventCategory;

  @IsOptional()
  @IsEnum(EventStatus)
  eventStatus?: EventStatus;

  @IsOptional()
  @IsISO8601()
  startDate?: string;

  @IsOptional()
  @IsISO8601()
  endDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  timeRange?: string;

  @IsOptional()
  @IsEnum(VenueType)
  venueType?: VenueType;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  organizer?: string;

  @IsOptional()
  @IsUrl()
  registrationUrl?: string;

  @IsOptional()
  @IsISO8601()
  registrationDeadline?: string;

  @IsOptional()
  @IsBoolean()
  isExternal?: boolean;

  // Localized Content Updates
  @IsOptional()
  @IsIn(['en', 'mr'])
  locale?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  shortDescription?: string;

  @IsOptional()
  fullDescription?: unknown;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  venueName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  venueAddress?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetAudience?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  agendaHighlights?: string[];
}

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

export class CreateEventDto {
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must contain only lowercase alphanumeric characters and single hyphens',
  })
  @MaxLength(100)
  slug!: string;

  @IsEnum(EventCategory)
  category!: EventCategory;

  @IsOptional()
  @IsEnum(EventStatus)
  eventStatus?: EventStatus = EventStatus.UPCOMING;

  @IsISO8601()
  startDate!: string;

  @IsISO8601()
  endDate!: string;

  @IsString()
  @MaxLength(100)
  timeRange!: string;

  @IsEnum(VenueType)
  venueType!: VenueType;

  @IsString()
  @MaxLength(150)
  organizer!: string;

  @IsOptional()
  @IsUrl()
  registrationUrl?: string;

  @IsOptional()
  @IsISO8601()
  registrationDeadline?: string;

  @IsOptional()
  @IsBoolean()
  isExternal?: boolean = false;

  // Initial Localized Content
  @IsOptional()
  @IsIn(['en', 'mr'])
  locale?: string = 'en';

  @IsString()
  @MinLength(5)
  @MaxLength(255)
  title!: string;

  @IsString()
  @MinLength(10)
  @MaxLength(500)
  shortDescription!: string;

  @IsOptional()
  fullDescription?: unknown = [];

  @IsString()
  @MaxLength(200)
  venueName!: string;

  @IsString()
  @MaxLength(300)
  venueAddress!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetAudience?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  agendaHighlights?: string[] = [];
}

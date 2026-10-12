import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
  IsOptional,
  IsDateString,
  IsUrl,
  IsIn,
  IsArray,
} from 'class-validator';
import { NewsCategory } from '@prisma/client';

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must consist of lowercase alphanumeric characters and hyphens only.',
  })
  slug: string;

  @IsEnum(NewsCategory, {
    message: 'Category must be one of OFFICIAL_ANNOUNCEMENT, FUNDING_MILESTONE, INFRASTRUCTURE, ECOSYSTEM_PARTNERSHIP.',
  })
  category: NewsCategory;

  @IsOptional()
  @IsDateString()
  publishDate?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  sourceAttribution: string;

  @IsOptional()
  @IsUrl({}, { message: 'External press link must be a valid URL.' })
  externalPressLink?: string;

  @IsOptional()
  @IsIn(['en', 'mr'], { message: 'Locale must be en or mr.' })
  locale?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  headline: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(500)
  summary: string;

  @IsNotEmpty({ message: 'Content body must not be empty.' })
  content: string | string[];

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsArray()
  keyFacts?: Array<{ label: string; value: string }>;
}

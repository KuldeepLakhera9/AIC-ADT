import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
  IsDateString,
  IsUrl,
  IsIn,
  IsArray,
} from 'class-validator';
import { NewsCategory } from '@prisma/client';

export class UpdateNewsDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must consist of lowercase alphanumeric characters and hyphens only.',
  })
  slug?: string;

  @IsOptional()
  @IsEnum(NewsCategory)
  category?: NewsCategory;

  @IsOptional()
  @IsDateString()
  publishDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  sourceAttribution?: string;

  @IsOptional()
  @IsUrl({}, { message: 'External press link must be a valid URL.' })
  externalPressLink?: string;

  @IsOptional()
  @IsIn(['en', 'mr'])
  locale?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  headline?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  summary?: string;

  @IsOptional()
  content?: string | string[];

  @IsOptional()
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsArray()
  keyFacts?: Array<{ label: string; value: string }>;
}

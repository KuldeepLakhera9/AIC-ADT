import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { DEFAULT_PUBLIC_LIMIT, DEFAULT_PUBLIC_PAGE, MAX_PUBLIC_LIMIT } from '../public.constants.js';

export class QueryPublicContentDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = DEFAULT_PUBLIC_PAGE;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_PUBLIC_LIMIT)
  limit?: number = DEFAULT_PUBLIC_LIMIT;

  @IsOptional()
  @IsIn(['en', 'mr'], { message: 'Locale must be either "en" or "mr"' })
  locale?: string = 'en';

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  search?: string;
}

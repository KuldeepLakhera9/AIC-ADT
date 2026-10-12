import { IsEnum, IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ContentEntityType, ContentStatus } from '../workflow.constants.js';

export class QueryReviewQueueDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number = 10;

  @IsOptional()
  @IsEnum(ContentStatus)
  status?: ContentStatus;

  @IsOptional()
  @IsEnum(ContentEntityType)
  entityType?: ContentEntityType;

  @IsOptional()
  @IsIn(['en', 'mr'])
  locale?: string;

  @IsOptional()
  @IsString()
  search?: string;
}

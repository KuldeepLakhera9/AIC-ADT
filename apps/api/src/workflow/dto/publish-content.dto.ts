import { IsIn, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class WorkflowPublishContentDto {
  @IsIn(['en', 'mr'], { message: 'Locale must be either "en" or "mr"' })
  locale: string = 'en';

  /**
   * Optimistic Concurrency Control: The expected version number that the editor viewed when approving.
   * If provided and differs from the active version, a 409 Conflict is returned.
   */
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  expectedVersion?: number;
}

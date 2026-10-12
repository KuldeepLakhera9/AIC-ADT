import { IsIn, IsInt, IsNotEmpty, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class WorkflowRollbackRevisionDto {
  @IsIn(['en', 'mr'], { message: 'Locale must be either "en" or "mr"' })
  locale: string = 'en';

  /**
   * The historical version number to restore
   */
  @Type(() => Number)
  @IsInt()
  @Min(1)
  targetVersion!: number;

  @IsNotEmpty({ message: 'A justification reason for the rollback is required.' })
  @IsString()
  @MinLength(10, { message: 'Rollback justification reason must be at least 10 characters.' })
  @MaxLength(500, { message: 'Rollback justification reason cannot exceed 500 characters.' })
  reason!: string;
}

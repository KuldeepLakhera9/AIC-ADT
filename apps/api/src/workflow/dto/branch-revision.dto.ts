import { IsIn, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class WorkflowBranchRevisionDto {
  @IsIn(['en', 'mr'], { message: 'Locale must be either "en" or "mr"' })
  locale: string = 'en';

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Changelog description cannot exceed 500 characters.' })
  changelog?: string;

  /**
   * The new draft state payload to be staged
   */
  @IsNotEmpty({ message: 'Staged revision snapshot data is required.' })
  @IsObject()
  dataSnapshot!: Record<string, unknown>;
}

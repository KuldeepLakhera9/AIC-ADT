import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class WorkflowApproveContentDto {
  @IsIn(['en', 'mr'], { message: 'Locale must be either "en" or "mr"' })
  locale: string = 'en';

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Approval notes cannot exceed 1000 characters.' })
  approvalNotes?: string;
}

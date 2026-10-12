import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class WorkflowSubmitReviewDto {
  @IsIn(['en', 'mr'], { message: 'Locale must be either "en" or "mr"' })
  locale: string = 'en';

  @IsOptional()
  @IsString()
  @MaxLength(1000, { message: 'Review notes cannot exceed 1000 characters' })
  submissionNotes?: string;
}

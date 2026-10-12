import { IsIn, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class WorkflowRequestChangesDto {
  @IsIn(['en', 'mr'], { message: 'Locale must be either "en" or "mr"' })
  locale: string = 'en';

  @IsNotEmpty({ message: 'Reviewer comments explaining required changes are mandatory.' })
  @IsString()
  @MinLength(10, { message: 'Reviewer comments must be at least 10 characters long to provide actionable feedback.' })
  @MaxLength(2000, { message: 'Reviewer comments cannot exceed 2000 characters.' })
  reviewerNotes!: string;
}

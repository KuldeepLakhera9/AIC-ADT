import { IsOptional, IsString, MaxLength } from 'class-validator';

export class SubmitReviewDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  submissionNotes?: string;
}

import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'A valid institutional email address is required' })
  @IsNotEmpty({ message: 'Email address cannot be blank' })
  email: string;

  @IsString({ message: 'Password must be a valid string' })
  @IsNotEmpty({ message: 'Password cannot be blank' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;
}

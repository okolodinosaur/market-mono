import { IsString, MinLength } from 'class-validator';

const MIN_PASS_LENGTH = +process.env.MIN_PASS_LENGTH;

export class SignInDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(MIN_PASS_LENGTH)
  password: string;
}

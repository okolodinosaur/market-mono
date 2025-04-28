import { Expose } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

const MIN_PASS_LENGTH = +process.env.MIN_PASS_LENGTH;

export class CreateUserDto {
  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;

  @Expose()
  @IsString()
  @MinLength(MIN_PASS_LENGTH)
  password: string;

  @Expose()
  @IsString()
  @MinLength(3)
  username: string;
}

import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @MaxLength(20)
  @MinLength(4)
  @IsString()
  username: string;

  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  @MaxLength(16)
  @MinLength(4)
  @IsString()
  password: string;
}

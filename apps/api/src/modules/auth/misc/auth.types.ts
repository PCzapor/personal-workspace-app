import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class RegisterRequest {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(1)
  @MaxLength(128)
  password!: string;

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;
}
export class LoginRequest extends RegisterRequest {}

export class AuthUserResponse {
  id!: string;
  email!: string;
  displayName?: string | null;
}

export type AuthRequestUser = {
  userId: string;
  sessionId: string;
};

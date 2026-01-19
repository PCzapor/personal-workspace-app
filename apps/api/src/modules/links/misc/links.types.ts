import { IsUrl, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateLinkDto {
  @IsUrl({ require_protocol: true })
  url: string = '';

  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}

export class UpdateLinkDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}

export interface SavedLinkResponse {
  id: string;
  url: string;
  title: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

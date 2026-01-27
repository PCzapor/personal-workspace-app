import { IsOptional, IsString, MaxLength } from 'class-validator';
export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
};
export type Notes = {
  userId: string;
  notes: Note[];
};

export class CreateNoteDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100_000)
  content?: string;
}
export class UpdateNoteDto extends CreateNoteDto {}

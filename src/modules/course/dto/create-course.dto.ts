import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly previewVideo?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly previewText?: string;
}

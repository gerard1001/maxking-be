import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly estimatedDuration?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly previewVideo?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly previewText?: string;

  @IsString()
  @IsOptional()
  readonly tutor?: string;

  @IsBoolean()
  @IsOptional()
  readonly isPublished?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isFree?: boolean;

  @IsNumber()
  @IsOptional()
  readonly price?: number;

  @IsNumber()
  @IsOptional()
  readonly discount?: number;

  @IsString()
  @IsOptional()
  readonly currency?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  readonly tags?: string[];
}

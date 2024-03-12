import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly body: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  readonly tags: string[];
}

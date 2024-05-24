import { Type } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsDefined()
  @Type(() => String)
  readonly authorName: string;

  @IsString()
  @IsDefined()
  @Type(() => String)
  readonly title: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly summary?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly type: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly file?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly price?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  readonly currency?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Date)
  readonly publishedOn?: Date;
}

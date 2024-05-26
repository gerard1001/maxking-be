import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly coverImage?: string;

  @IsString()
  @IsDefined()
  @Type(() => String)
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly about?: string;

  @IsString()
  @IsOptional()
  @Type(() => String)
  readonly venue?: string;

  @IsString()
  @IsDefined()
  @Type(() => String)
  readonly type: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Date)
  readonly startDate?: Date;

  @IsNumber()
  @IsOptional()
  @Type(() => Date)
  readonly startTime?: Date;

  @IsNumber()
  @IsOptional()
  @Type(() => Date)
  readonly endDate?: Date;

  @IsNumber()
  @IsOptional()
  @Type(() => Date)
  readonly endTime?: Date;

  @IsArray()
  @IsOptional()
  @IsNotEmpty()
  readonly requirements?: string[];
}

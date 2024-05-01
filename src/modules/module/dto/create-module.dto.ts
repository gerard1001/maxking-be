import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateModuleDto {
  // @IsNumber()
  // @IsDefined()
  // @IsNotEmpty()
  // readonly moduleNumber: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly description?: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly content: string;
}

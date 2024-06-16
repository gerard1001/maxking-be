import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  @IsOptional()
  readonly coverImage?: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly short: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly description: string;
}

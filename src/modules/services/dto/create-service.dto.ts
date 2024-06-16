import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
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
  readonly description: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly body: string;
}

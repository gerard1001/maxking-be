import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCollaboratorDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  readonly name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => String)
  readonly url?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => String)
  readonly image?: string;
}

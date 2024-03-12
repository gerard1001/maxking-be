import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  readonly name: string;
}

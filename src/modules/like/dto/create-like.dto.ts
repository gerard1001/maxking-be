import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateLikeDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly text: string;
}

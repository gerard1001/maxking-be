import { IsDefined, IsNotEmpty, IsArray } from 'class-validator';

export class DeleteUsersDto {
  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  readonly ids: string[];
}

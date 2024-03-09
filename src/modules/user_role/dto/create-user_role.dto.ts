import { IsDefined, IsString } from 'class-validator';

export class CreateUserRoleDto {
  @IsString()
  @IsDefined()
  roleId: string;

  @IsString()
  @IsDefined()
  userId: string;
}

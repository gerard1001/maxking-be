import { Column, ForeignKey, IsUUID, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/modules/role/model/role.model';
import { User } from 'src/modules/user/model/user.model';

@Table({ tableName: 'UserRoles', timestamps: true })
export class UserRole extends Model<UserRole> {
  @ForeignKey(() => Role)
  @IsUUID(4)
  @Column
  readonly roleId: string;

  @ForeignKey(() => User)
  @IsUUID(4)
  @Column
  readonly userId: string;
}

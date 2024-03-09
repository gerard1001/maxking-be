import { Column, Table, Model, BelongsToMany } from 'sequelize-typescript';
import { User } from 'src/modules/user/model/user.model';
import { UserRole } from 'src/modules/user_role/models/user_role.model';

@Table({ tableName: 'Roles', timestamps: true })
export class Role extends Model<Role> {
  @Column
  type: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}

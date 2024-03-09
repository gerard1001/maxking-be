import {
  BelongsToMany,
  Column,
  DataType,
  IsEmail,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/modules/role/model/role.model';
import { UserRole } from 'src/modules/user_role/models/user_role.model';

@Table({ tableName: 'Users', timestamps: true })
export class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  @Column(DataType.BOOLEAN)
  isVerified: boolean;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}

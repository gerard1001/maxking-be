import { Column, ForeignKey, IsUUID, Table, Model } from 'sequelize-typescript';
import { Module } from 'src/modules/module/model/module.model';
import { User } from 'src/modules/user/model/user.model';

@Table({ tableName: 'UserModules', timestamps: true })
export class UserModule extends Model<UserModule> {
  @ForeignKey(() => User)
  @IsUUID(4)
  @Column
  readonly userId: string;

  @ForeignKey(() => Module)
  @IsUUID(4)
  @Column
  readonly moduleId: string;

  @Column
  readonly rank: string;
}

import {
  Column,
  Model,
  Table,
  IsUUID,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/model/user.model';

@Table({ tableName: 'Profiles', timestamps: true })
export class Profile extends Model<Profile> {
  @ForeignKey(() => User)
  @IsUUID(4)
  @Column
  userId: string;

  @Column
  title: string;

  @Column
  specialty: string;

  @Column
  phoneNumber: string;

  @Column
  gender: string;

  @Column
  birthDate: Date;

  @Column
  picture: string;

  @Column
  country: string;

  @Column
  city: string;

  @Column
  addressLine: string;

  @Column
  bio: string;

  @BelongsTo(() => User)
  user: User;
}

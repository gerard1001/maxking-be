import { Column, ForeignKey, IsUUID, Model, Table } from 'sequelize-typescript';
import { Certificate } from 'src/modules/certificate/model/certificate.model';
import { User } from 'src/modules/user/model/user.model';

@Table({ tableName: 'UserCertificates', timestamps: true })
export class UserCertificate extends Model<UserCertificate> {
  @ForeignKey(() => User)
  @IsUUID(4)
  @Column
  readonly userId: string;

  @ForeignKey(() => Certificate)
  @IsUUID(4)
  @Column
  readonly certificateId: string;

  @Column
  readonly userCertificateId: string;
}

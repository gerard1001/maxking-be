import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Issuer } from 'src/core/interfaces/response.interface';
import { Course } from 'src/modules/course/model/course.model';
import { User } from 'src/modules/user/model/user.model';
import { UserCertificate } from 'src/modules/user_certificate/model/user_certificate.model';

@Table({ tableName: 'Certificates', timestamps: true })
export class Certificate extends Model<Certificate> {
  @Column({ type: DataType.JSONB })
  issuers: string;

  // @Column
  // issuerName1: string;

  // @Column
  // issuerSignature1: string;

  // @Column
  // issuerPosition1: string;

  // @Column
  // issuerName2: string;

  // @Column
  // issuerSignature2: string;

  // @Column
  // issuerPosition2: string;

  @ForeignKey(() => Course)
  @Column
  courseId: string;

  @BelongsTo(() => Course)
  course: Course;

  @BelongsToMany(() => User, () => UserCertificate)
  users: User[];
}

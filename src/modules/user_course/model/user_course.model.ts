import { Column, ForeignKey, IsUUID, Table, Model } from 'sequelize-typescript';
import { Course } from 'src/modules/course/model/course.model';
import { User } from 'src/modules/user/model/user.model';

@Table({ tableName: 'UserCourses', timestamps: true })
export class UserCourse extends Model<UserCourse> {
  @ForeignKey(() => User)
  @IsUUID(4)
  @Column
  readonly userId: string;

  @ForeignKey(() => Course)
  @IsUUID(4)
  @Column
  readonly courseId: string;

  @Column
  readonly userType: string;
}

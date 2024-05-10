import { Column, ForeignKey, IsUUID, Table, Model } from 'sequelize-typescript';
import { Course } from 'src/modules/course/model/course.model';
import { User } from 'src/modules/user/model/user.model';

@Table({ tableName: 'UserCourses', timestamps: true })
export class UserCourse extends Model<UserCourse> {
  @ForeignKey(() => User)
  @IsUUID(4)
  @Column
  userId: string;

  @ForeignKey(() => Course)
  @IsUUID(4)
  @Column
  courseId: string;

  @Column
  userType: string;

  @Column
  currentModule: number;

  @Column
  rank: string;

  @Column
  completed: boolean;
}

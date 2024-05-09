import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Chapter } from 'src/modules/chapter/model/chapter.model';
import { Course } from 'src/modules/course/model/course.model';
import { User } from 'src/modules/user/model/user.model';
import { UserCourse } from 'src/modules/user_course/model/user_course.model';
import { UserModule } from 'src/modules/user_module/model/user_module.model';

@Table({ tableName: 'Modules', timestamps: true })
export class Module extends Model<Module> {
  @Column
  moduleNumber: number;

  @Column
  title: string;

  @Column
  description: string;

  // @Column
  // content: string;

  @ForeignKey(() => Course)
  @Column
  courseId: string;

  @BelongsTo(() => Course)
  course: Course;

  @HasMany(() => Chapter)
  chapters: Chapter[];

  @BelongsToMany(() => User, () => UserModule)
  users: User[];
}

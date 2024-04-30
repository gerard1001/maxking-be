import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { CourseTag } from 'src/modules/course_tag/model/course_tag.model';
import { Module } from 'src/modules/module/model/module.model';
import { Subject } from 'src/modules/subject/model/subject.model';
import { Tag } from 'src/modules/tag/model/tag.model';
import { User } from 'src/modules/user/model/user.model';
import { UserCourse } from 'src/modules/user_course/model/user_course.model';

@Table({ tableName: 'Courses', timestamps: true })
export class Course extends Model<Course> {
  @Column
  coverImage: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  estimatedDuration: string;

  @Column
  previewVideo: string;

  @Column
  previewText: string;

  @ForeignKey(() => Subject)
  @Column
  subjectId: string;

  @BelongsTo(() => Subject)
  subject: Subject;

  @HasMany(() => Module)
  modules: Module[];

  @BelongsToMany(() => User, () => UserCourse)
  users: User[];

  @BelongsToMany(() => Tag, () => CourseTag)
  tags: Tag[];
}

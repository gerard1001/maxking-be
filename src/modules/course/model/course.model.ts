import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Certificate } from 'src/modules/certificate/model/certificate.model';
import { CourseTag } from 'src/modules/course_tag/model/course_tag.model';
import { Module } from 'src/modules/module/model/module.model';
import { Question } from 'src/modules/question/model/question.model';
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

  @Column
  isFree: boolean;

  @Column
  price: number;

  @Column
  discount: number;

  @Column
  currency: number;

  @Column
  isPublished: boolean;

  @ForeignKey(() => Subject)
  @Column
  subjectId: string;

  @BelongsTo(() => Subject)
  subject: Subject;

  @HasMany(() => Module)
  modules: Module[];

  @HasMany(() => Question)
  questions: Question[];

  @BelongsToMany(() => User, () => UserCourse)
  users: User[];

  @BelongsToMany(() => Tag, () => CourseTag)
  tags: Tag[];

  @HasOne(() => Certificate)
  certificate: Certificate;
}

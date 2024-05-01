import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Chapter } from 'src/modules/chapter/model/chapter.model';
import { Course } from 'src/modules/course/model/course.model';

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
}

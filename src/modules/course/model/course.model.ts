import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Module } from 'src/modules/module/model/module.model';
import { Subject } from 'src/modules/subject/model/subject.model';

@Table({ tableName: 'Courses', timestamps: true })
export class Course extends Model<Course> {
  @Column
  coverImage: string;

  @Column
  title: string;

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
}

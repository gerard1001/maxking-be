import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Choice } from 'src/core/interfaces/response.interface';
import { Course } from 'src/modules/course/model/course.model';
import { Module } from 'src/modules/module/model/module.model';

@Table({ tableName: 'Questions', timestamps: true })
export class Question extends Model<Question> {
  @Column
  question: string;

  @Column({ type: DataType.JSONB })
  choices: Choice[];

  @Column
  trueAnswer: string;

  @ForeignKey(() => Course)
  @Column
  courseId: string;

  @ForeignKey(() => Module)
  @Column
  moduleId: string;

  @BelongsTo(() => Course)
  course: Course;

  @BelongsTo(() => Module)
  module: Module;
}

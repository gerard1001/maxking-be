import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Category } from 'src/modules/category/model/category.model';
import { Course } from 'src/modules/course/model/course.model';

@Table({ tableName: 'Subjects', timestamps: true })
export class Subject extends Model<Subject> {
  @Column
  name: string;

  @ForeignKey(() => Category)
  @Column
  categoryId: string;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Course)
  courses: Course[];
}

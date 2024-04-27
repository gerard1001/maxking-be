import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Subject } from 'src/modules/subject/model/subject.model';

@Table({ tableName: 'Categories', timestamps: true })
export class Category extends Model<Category> {
  @Column
  name: string;

  @Column
  image: string;

  @HasMany(() => Subject)
  subjects: Subject[];
}

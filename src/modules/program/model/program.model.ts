import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Programs', timestamps: true })
export class Program extends Model<Program> {
  @Column
  coverImage: string;

  @Column
  title: string;

  @Column
  short: string;

  @Column
  description: string;
}

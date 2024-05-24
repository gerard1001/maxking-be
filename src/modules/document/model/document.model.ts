import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Documents', timestamps: true })
export class Document extends Model<Document> {
  @Column
  authorName: string;

  @Column
  title: string;

  @Column
  summary: string;

  @Column
  type: string;

  @Column
  file: string;

  @Column
  price: number;

  @Column
  currency: number;

  @Column
  publishedOn: Date;
}

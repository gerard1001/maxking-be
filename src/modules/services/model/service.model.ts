import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Services', timestamps: true })
export class Service extends Model<Service> {
  @Column
  coverImage: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  body: string;
}

import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Collaborators', timestamps: true })
export class Collaborator extends Model<Collaborator> {
  @Column
  name: string;

  @Column
  url: string;

  @Column
  image: string;
}

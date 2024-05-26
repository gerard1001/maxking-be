import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Events', timestamps: true })
export class Event extends Model<Event> {
  @Column
  coverImage: string;

  @Column
  title: string;

  @Column
  about: string;

  @Column
  venue: string;

  @Column
  type: string;

  @Column
  startDate: Date;

  @Column
  startTime: Date;

  @Column
  endDate: Date;

  @Column
  endTime: Date;

  @Column({ type: DataType.JSONB })
  requirements: string[];
}

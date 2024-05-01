import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Module } from 'src/modules/module/model/module.model';

@Table({ tableName: 'Chapters', timestamps: true })
export class Chapter extends Model<Chapter> {
  @Column
  chapterNumber: number;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  content: string;

  @ForeignKey(() => Module)
  @Column
  moduleId: string;

  @BelongsTo(() => Module)
  module: Module;
}

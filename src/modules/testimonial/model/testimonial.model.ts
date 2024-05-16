import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/model/user.model';

@Table({ tableName: 'Testimonials', timestamps: true })
export class Testimonial extends Model<Testimonial> {
  @Column
  text: string;

  @Column
  isPinned: boolean;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User)
  user: User;
}

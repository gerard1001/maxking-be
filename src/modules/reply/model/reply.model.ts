import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Comment } from 'src/modules/comment/model/comment.model';
import { User } from 'src/modules/user/model/user.model';

@Table({ tableName: 'Replies', timestamps: true })
export class Reply extends Model<Reply> {
  @Column
  text: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Comment)
  @Column
  commentId: string;

  @BelongsTo(() => User)
  writer: User;

  @BelongsTo(() => Comment)
  comment: Comment;
}

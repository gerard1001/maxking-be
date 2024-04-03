import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Article } from 'src/modules/article/model/article.model';
import { Reply } from 'src/modules/reply/model/reply.model';
import { User } from 'src/modules/user/model/user.model';

@Table({ tableName: 'Comments', timestamps: true })
export class Comment extends Model<Comment> {
  @Column
  text: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Article)
  @Column
  articleId: string;

  @BelongsTo(() => User)
  writer: User;

  @BelongsTo(() => Article)
  article: Article;

  @HasMany(() => Reply)
  replies: Reply[];
}

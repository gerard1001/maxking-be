import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Article } from 'src/modules/article/model/article.model';
import { Comment } from 'src/modules/comment/model/comment.model';
import { User } from 'src/modules/user/model/user.model';

@Table({ tableName: 'Likes', timestamps: true })
export class Like extends Model<Like> {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Article)
  @Column
  articleId: string;

  @ForeignKey(() => Comment)
  @Column
  commentId: string;

  @BelongsTo(() => User)
  liker: User;

  @BelongsTo(() => Article)
  article: Article;

  @BelongsTo(() => Comment)
  comment: Comment;
}

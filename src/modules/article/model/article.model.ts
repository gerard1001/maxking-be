import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ArticleTag } from 'src/modules/article_tag/model/article_tag.model';
import { Comment } from 'src/modules/comment/model/comment.model';
import { Tag } from 'src/modules/tag/model/tag.model';
import { User } from 'src/modules/user/model/user.model';
import { UserArticle } from 'src/modules/user_article/model/user_article.model';

@Table({ tableName: 'Articles', timestamps: true })
export class Article extends Model<Article> {
  @Column
  coverImage: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  body: string;

  @ForeignKey(() => User)
  @Column
  authorId: string;

  @BelongsTo(() => User)
  author: User;

  @BelongsToMany(() => Tag, () => ArticleTag)
  tags: Tag[];

  @BelongsToMany(() => User, () => UserArticle)
  favoritedBy: User[];

  @HasMany(() => Comment)
  comments: Comment[];
}

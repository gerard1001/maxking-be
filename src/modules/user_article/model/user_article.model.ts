import { Column, ForeignKey, IsUUID, Model, Table } from 'sequelize-typescript';
import { Article } from 'src/modules/article/model/article.model';
import { User } from 'src/modules/user/model/user.model';

@Table({ tableName: 'UserArticles', timestamps: true })
export class UserArticle extends Model<UserArticle> {
  @ForeignKey(() => User)
  @IsUUID(4)
  @Column
  readonly userId: string;

  @ForeignKey(() => Article)
  @IsUUID(4)
  @Column
  readonly articleId: string;
}

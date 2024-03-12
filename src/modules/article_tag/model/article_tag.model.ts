import { Column, ForeignKey, IsUUID, Table, Model } from 'sequelize-typescript';
import { Article } from 'src/modules/article/model/article.model';
import { Tag } from 'src/modules/tag/model/tag.model';

@Table({ tableName: 'ArticleTags', timestamps: true })
export class ArticleTag extends Model<ArticleTag> {
  @ForeignKey(() => Article)
  @IsUUID(4)
  @Column
  readonly articleId: string;

  @ForeignKey(() => Tag)
  @IsUUID(4)
  @Column
  readonly tagId: string;
}

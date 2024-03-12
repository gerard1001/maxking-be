import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Article } from 'src/modules/article/model/article.model';
import { ArticleTag } from 'src/modules/article_tag/model/article_tag.model';

@Table({ tableName: 'Tags', timestamps: true })
export class Tag extends Model<Tag> {
  @Column
  name: string;

  @BelongsToMany(() => Article, () => ArticleTag)
  articles: Article[];
}

import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, PRODUCTION, TEST } from 'src/core/constants';
import { databaseConfig } from '../database.config';
import { User } from 'src/modules/user/model/user.model';
import { Role } from 'src/modules/role/model/role.model';
import { UserRole } from 'src/modules/user_role/models/user_role.model';
import { Article } from 'src/modules/article/model/article.model';
import { UserArticle } from 'src/modules/user_article/model/user_article.model';
import { Tag } from 'src/modules/tag/model/tag.model';
import { ArticleTag } from 'src/modules/article_tag/model/article_tag.model';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config: any;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        User,
        Role,
        UserRole,
        Article,
        UserArticle,
        Tag,
        ArticleTag,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

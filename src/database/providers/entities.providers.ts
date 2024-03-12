import {
  ARTICLE_MODEL,
  ARTICLE_TAG_MODEL,
  ROLE_MODEL,
  TAG_MODEL,
  USER_ARTICLE_MODEL,
  USER_MODEL,
  USER_ROLE_MODEL,
} from 'src/core/constants';
import { Article } from 'src/modules/article/model/article.model';
import { ArticleTag } from 'src/modules/article_tag/model/article_tag.model';
import { Role } from 'src/modules/role/model/role.model';
import { Tag } from 'src/modules/tag/model/tag.model';
import { User } from 'src/modules/user/model/user.model';
import { UserArticle } from 'src/modules/user_article/model/user_article.model';
import { UserRole } from 'src/modules/user_role/models/user_role.model';

export const userProviders = [
  {
    provide: USER_MODEL,
    useValue: User,
  },
];

export const roleProviders = [
  {
    provide: ROLE_MODEL,
    useValue: Role,
  },
];

export const userRoleProviders = [
  {
    provide: USER_ROLE_MODEL,
    useValue: UserRole,
  },
];

export const tagProviders = [
  {
    provide: TAG_MODEL,
    useValue: Tag,
  },
];

export const articleProviders = [
  {
    provide: ARTICLE_MODEL,
    useValue: Article,
  },
];

export const userArticleProviders = [
  {
    provide: USER_ARTICLE_MODEL,
    useValue: UserArticle,
  },
];

export const articleTagProviders = [
  {
    provide: ARTICLE_TAG_MODEL,
    useValue: ArticleTag,
  },
];

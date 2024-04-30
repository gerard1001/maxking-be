import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  IsEmail,
  Model,
  Table,
} from 'sequelize-typescript';
import { Article } from 'src/modules/article/model/article.model';
import { Comment } from 'src/modules/comment/model/comment.model';
import { Course } from 'src/modules/course/model/course.model';
import { Profile } from 'src/modules/profile/model/profile.model';
import { Role } from 'src/modules/role/model/role.model';
import { UserArticle } from 'src/modules/user_article/model/user_article.model';
import { UserCourse } from 'src/modules/user_course/model/user_course.model';
import { UserRole } from 'src/modules/user_role/models/user_role.model';

@Table({ tableName: 'Users', timestamps: true })
export class User extends Model<User> {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  @Column(DataType.BOOLEAN)
  isVerified: boolean;

  @Column(DataType.BOOLEAN)
  isGoogleUser: boolean;

  @Column(DataType.BOOLEAN)
  publicDisplay: boolean;

  @HasOne(() => Profile)
  profile: Profile;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @BelongsToMany(() => Course, () => UserCourse)
  courses: Course[];

  @BelongsToMany(() => Article, () => UserArticle)
  favorites: Article[];

  @HasMany(() => Article)
  articles: Article[];

  @HasMany(() => Comment)
  comments: Comment[];
}

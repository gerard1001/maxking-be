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
import { Module } from 'src/modules/module/model/module.model';
import { Profile } from 'src/modules/profile/model/profile.model';
import { Role } from 'src/modules/role/model/role.model';
import { Testimonial } from 'src/modules/testimonial/model/testimonial.model';
import { UserArticle } from 'src/modules/user_article/model/user_article.model';
import { UserCourse } from 'src/modules/user_course/model/user_course.model';
import { UserModule } from 'src/modules/user_module/model/user_module.model';
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

  @HasOne(() => Testimonial)
  testimonial: Testimonial;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @BelongsToMany(() => Course, () => UserCourse)
  courses: Course[];

  @BelongsToMany(() => Module, () => UserModule)
  modules: Module[];

  @BelongsToMany(() => Article, () => UserArticle)
  favorites: Article[];

  @HasMany(() => Article)
  articles: Article[];

  @HasMany(() => Comment)
  comments: Comment[];
}

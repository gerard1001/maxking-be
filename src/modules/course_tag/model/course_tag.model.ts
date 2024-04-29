import { Column, ForeignKey, IsUUID, Table, Model } from 'sequelize-typescript';
import { Course } from 'src/modules/course/model/course.model';
import { Tag } from 'src/modules/tag/model/tag.model';

@Table({ tableName: 'CourseTags', timestamps: true })
export class CourseTag extends Model<CourseTag> {
  @ForeignKey(() => Course)
  @IsUUID(4)
  @Column
  readonly courseId: string;

  @ForeignKey(() => Tag)
  @IsUUID(4)
  @Column
  readonly tagId: string;
}

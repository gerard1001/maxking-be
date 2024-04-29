import { IsDefined, IsString } from 'class-validator';

export class CreateCourseTagDto {
  @IsString()
  @IsDefined()
  readonly courseId: string;

  @IsString()
  @IsDefined()
  readonly tagId: string;
}

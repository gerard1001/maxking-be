import { IsDefined, IsEnum, IsString } from 'class-validator';

export class CreateUserCourseDto {
  @IsString()
  @IsDefined()
  readonly userId: string;

  @IsString()
  @IsDefined()
  readonly courseId: string;

  @IsString()
  @IsDefined()
  @IsEnum(['STUDENT', 'TUTOR'])
  readonly userType: string;
}

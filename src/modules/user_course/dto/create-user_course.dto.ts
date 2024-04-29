import { IsDefined, IsEnum, IsNumber, IsString } from 'class-validator';

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

  @IsNumber()
  @IsDefined()
  readonly currentModule?: string;
}

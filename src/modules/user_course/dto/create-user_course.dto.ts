import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserCourseDto {
  @IsString()
  @IsDefined()
  readonly userId: string;

  @IsString()
  @IsDefined()
  readonly courseId: string;

  @IsString()
  @IsOptional()
  @IsEnum(['STUDENT', 'TUTOR'])
  readonly userType?: string;

  @IsNumber()
  @IsDefined()
  readonly currentModule?: number;

  @IsString()
  @IsDefined()
  readonly rank?: string;

  @IsBoolean()
  @IsOptional()
  readonly completed?: boolean;
}

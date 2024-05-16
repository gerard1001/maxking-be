import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTestimonialDto {
  @IsUUID()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  readonly userId: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  readonly text: string;

  @IsBoolean()
  @Type(() => Boolean)
  readonly isPinned?: boolean;
}

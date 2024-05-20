import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateTweetDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @Type(() => String)
  readonly tweetId: string;

  @IsBoolean()
  @Type(() => Boolean)
  readonly isPinned?: boolean;
}

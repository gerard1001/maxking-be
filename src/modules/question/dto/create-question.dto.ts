import { IsArray, IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { Choice } from 'src/core/interfaces/response.interface';

export class CreateQuestionDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly question: string;

  @IsArray()
  @IsDefined()
  @IsNotEmpty()
  readonly choices: Choice[];

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly trueAnswer: string;
}

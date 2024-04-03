import { IsDefined, IsNotEmpty, IsBoolean } from 'class-validator';

export class FeatureArticlesDto {
  @IsBoolean()
  @IsDefined()
  @IsNotEmpty()
  readonly isFeatured: boolean;
}

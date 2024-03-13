import { ConfigOptions, v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
import { ConfigService } from '@nestjs/config';

export const cloudinaryProvider = {
  provide: CLOUDINARY,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): ConfigOptions => {
    return v2.config({
      cloud_name: configService.get('CLOUD_NAME'),
      api_key: configService.get('CLOUD_API_KEY'),
      api_secret: configService.get('CLOUD_SECRET'),
    });
  },
};

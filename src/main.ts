import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );
  await app.listen(5050, () => {
    console.log('Server is running on port 5050');
  });
}
bootstrap();

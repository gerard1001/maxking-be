import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5050, () => {
    console.log('Server is running on port 5050');
  });
}
bootstrap();

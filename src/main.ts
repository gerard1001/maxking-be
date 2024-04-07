import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const version = configService.get<string>('API_VERSION');
  const port = configService.get<number>('PORT');
  const logger = new Logger();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );
  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.setGlobalPrefix(version);
  await app.listen(port, () => {
    logger.verbose(`Server is running on: http://localhost:${port}/${version}`);
  });
}
bootstrap();

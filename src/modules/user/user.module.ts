import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from 'src/database/providers/entities.providers';
import { UserRepository } from './providers/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, ...userProviders],
  exports: [UserService, UserRepository, ...userProviders],
})
export class UserModule {}

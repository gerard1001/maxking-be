import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from 'src/database/providers/entities.providers';
import { UserRepository } from './providers/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository, ...userProviders],
  exports: [UserService, UserRepository, ...userProviders],
})
export class UserModule {}

import { Module, forwardRef } from '@nestjs/common';
import { UserModuleService } from './user_module.service';
import { UserModuleController } from './user_module.controller';
import { UserModuleRepository } from './providers/user_module.repository';
import { userModuleProviders } from 'src/database/providers/entities.providers';
import { UserModule } from '../user/user.module';
import { ModuleModule } from '../module/module.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => ModuleModule)],
  controllers: [UserModuleController],
  providers: [UserModuleService, UserModuleRepository, ...userModuleProviders],
  exports: [UserModuleService, UserModuleRepository, ...userModuleProviders],
})
export class UserModuleModule {}

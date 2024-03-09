import { Module, forwardRef } from '@nestjs/common';
import { UserRoleService } from './user_role.service';
import { UserRoleController } from './user_role.controller';
import { userRoleProviders } from 'src/database/providers/entities.providers';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { UserRoleRepository } from './providers/user_role.repository';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => RoleModule)],
  controllers: [UserRoleController],
  providers: [UserRoleService, UserRoleRepository, ...userRoleProviders],
  exports: [UserRoleService, UserRoleRepository, ...userRoleProviders],
})
export class UserRoleModule {}

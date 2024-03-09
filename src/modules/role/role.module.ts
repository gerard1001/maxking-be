import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { roleProviders } from 'src/database/providers/entities.providers';
import { RoleRepository } from './providers/role.repository';

@Module({
  controllers: [RoleController],
  providers: [RoleService, RoleRepository, ...roleProviders],
  exports: [RoleService, RoleRepository, ...roleProviders],
})
export class RoleModule {}

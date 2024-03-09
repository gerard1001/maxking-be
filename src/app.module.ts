import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './modules/profile/profile.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { UserRoleModule } from './modules/user_role/user_role.module';

@Module({
  imports: [DatabaseModule, ProfileModule, AuthModule, UserModule, RoleModule, UserRoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

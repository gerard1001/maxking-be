import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PasswordHelper } from 'src/core/helpers/password.helper';
import { RoleModule } from '../role/role.module';
import { UserRoleModule } from '../user_role/user_role.module';
import { AuthRepository } from './providers/auth.repository';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => RoleModule),
    forwardRef(() => UserRoleModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, PasswordHelper],
})
export class AuthModule {}

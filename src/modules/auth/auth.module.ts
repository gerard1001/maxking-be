import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PasswordHelper } from 'src/core/helpers/password.helper';
import { RoleModule } from '../role/role.module';
import { UserRoleModule } from '../user_role/user_role.module';
import { AuthHelper } from 'src/core/helpers/auth.helper';
import { JwtDynamicModule } from 'src/core/jwt/jwt.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => RoleModule),
    forwardRef(() => UserRoleModule),
    JwtDynamicModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [AuthService, PasswordHelper, AuthHelper],
  exports: [AuthHelper],
})
export class AuthModule {}

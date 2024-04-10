import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PasswordHelper } from 'src/core/helpers/password.helper';
import { RoleModule } from '../role/role.module';
import { UserRoleModule } from '../user_role/user_role.module';
import { AuthHelper } from 'src/core/helpers/auth.helper';
import { JwtDynamicModule } from 'src/core/jwt/jwt.module';
import { SessionSerializer } from 'src/core/utils/auth.serializer';
import { GoogleAuthStrategy } from 'src/core/strategies/google.strategy';
import { JwtStrategy } from 'src/core/strategies/jwt.strategy';
import { ProfileModule } from '../profile/profile.module';
import { MailerHelper } from 'src/core/helpers/mailer.helper';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => RoleModule),
    forwardRef(() => UserRoleModule),
    forwardRef(() => ProfileModule),
    JwtDynamicModule.forRoot(),
    CacheModule.register(),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordHelper,
    AuthHelper,
    GoogleAuthStrategy,
    JwtStrategy,
    SessionSerializer,
    MailerHelper,
  ],
  exports: [AuthHelper],
})
export class AuthModule {}

import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/modules/user/model/user.model';
import { UserRepository } from 'src/modules/user/providers/user.repository';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepo: UserRepository,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.userRepo.findByEmail(payload.email);
    return user ? done(null, user) : done(null, null);
  }
}

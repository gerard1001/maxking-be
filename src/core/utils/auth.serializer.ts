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
    console.log('Serializer User');
    console.log(user);

    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    console.log('Deserialize User', payload);

    const user = await this.userRepo.findByEmail(payload.email);
    console.log('Deserialize User');
    console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}

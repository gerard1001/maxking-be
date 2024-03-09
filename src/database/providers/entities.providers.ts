import { ROLE_MODEL, USER_MODEL, USER_ROLE_MODEL } from 'src/core/constants';
import { Role } from 'src/modules/role/model/role.model';
import { User } from 'src/modules/user/model/user.model';
import { UserRole } from 'src/modules/user_role/models/user_role.model';

export const userProviders = [
  {
    provide: USER_MODEL,
    useValue: User,
  },
];

export const roleProviders = [
  {
    provide: ROLE_MODEL,
    useValue: Role,
  },
];

export const userRoleProviders = [
  {
    provide: USER_ROLE_MODEL,
    useValue: UserRole,
  },
];

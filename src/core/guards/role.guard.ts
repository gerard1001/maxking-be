import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from 'src/modules/user/providers/user.repository';
import { GuardMetadata } from '../interfaces/guard.interface';
import { ENUM_ROLE_TYPE } from '../constants/role.constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const metadata = this.reflector.get<GuardMetadata>(
      'metadata',
      context.getHandler(),
    );
    const roles = metadata?.roles;
    const request = context.switchToHttp().getRequest();
    const user = await this.userRepository.findById(request?.user?.id);
    if (!user) {
      throw new HttpException(
        'Logged-in user is unidentified',
        HttpStatus.NOT_FOUND,
      );
    }

    /* FOR OWNER ACCOUNT */

    if (roles?.length === 0 && !metadata?.checkOwner) {
      throw new HttpException(
        'You did not provide a role.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (roles?.length === 0 && metadata?.checkOwner) {
      if (request?.user?.id === request?.params?.id) {
        return true;
      } else {
        throw new HttpException(
          'Only the account owner can perform this action.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    /* FOR MULTIPLE ROLES */

    const compareRoles = (allowedRoles: string[], userRole: string[]) => {
      return allowedRoles.some((elementA) => userRole.includes(elementA));
    };

    if (roles?.length >= 1 && !metadata?.checkOwner) {
      if (
        compareRoles(
          roles,
          user.roles.map((role) => role.type),
        )
      ) {
        return true;
      } else {
        const lastRole = roles[roles.length - 1];
        const rolesString = roles.slice(0, -1).join(', ');
        throw new HttpException(
          `This action can be performed by ${
            roles.length === 1 ? `${roles[0]}` : `${rolesString} or ${lastRole}`
          }.`,
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
    if (roles?.length >= 1 && metadata?.checkOwner) {
      const role = roles?.length === 1 && roles[0];
      if (
        role === ENUM_ROLE_TYPE.CLIENT &&
        compareRoles(
          roles,
          user.roles.map((role) => role.type),
        ) &&
        request?.user?.id === request?.params?.id
      ) {
        return true;
      } else if (
        role !== ENUM_ROLE_TYPE.CLIENT ||
        !compareRoles(
          roles,
          user.roles.map((role) => role.type),
        ) ||
        request?.user?.id !== request?.params?.id
      ) {
        throw new HttpException(
          `This action can be performed by account owner who is a ${ENUM_ROLE_TYPE.CLIENT}.`,
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (
        compareRoles(
          roles,
          user.roles.map((role) => role.type),
        ) ||
        request?.user?.id === request?.params?.id
      ) {
        return true;
      } else {
        const lastRole = roles[roles.length - 1];
        const rolesString = roles.slice(0, -1).join(', ');

        throw new HttpException(
          `This action can be performed by account owner${
            roles.length === 1
              ? ` or ${roles[0]}`
              : `, ${rolesString} or ${lastRole}`
          }.`,
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }
}

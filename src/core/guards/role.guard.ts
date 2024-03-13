import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from 'src/modules/user/providers/user.repository';
import { IGuardMetadata } from '../interfaces/guard.interface';
import { ENUM_ROLE_TYPE } from '../constants/role.constants';
import { compareRoles } from '../functions/algorithms.functions';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const metadata = this.reflector.get<IGuardMetadata>(
      'metadata',
      context.getHandler(),
    );
    const roles = metadata.roles;
    const accOwner = metadata.accOwner;
    const request = context.switchToHttp().getRequest();
    const user = await this.userRepository.findById(request.user.id);
    if (!user) {
      throw new HttpException(
        'Logged-in user is unidentified',
        HttpStatus.NOT_FOUND,
      );
    }

    // const compareRoles = (allowedRoles: string[], userRole: string[]) => {
    //   return allowedRoles.some((elementA) => userRole.includes(elementA));
    // };

    if (roles.length === 0 && !accOwner.checkAccOwner) {
      throw new HttpException(
        'You did not provide a role.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (roles.length === 0 && accOwner.checkAccOwner) {
      if (
        accOwner.checkAccOwner &&
        !accOwner.allowAnyRole &&
        accOwner.accOwnerRoles.length === 0
      ) {
        throw new HttpException(
          'There is no account ownership for this action.',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (request.user.id === request.params.id && accOwner.allowAnyRole) {
        return true;
      }
      if (request.user.id === request.params.id && !accOwner.allowAnyRole) {
        if (accOwner.accOwnerRoles.length === 0) {
          throw new HttpException(
            "You have to specify the user's allowed roles",
            HttpStatus.BAD_REQUEST,
          );
        }
        if (
          compareRoles(
            accOwner.accOwnerRoles,
            user.roles.map((role) => role.type),
          )
        ) {
          return true;
        } else {
          const lastRole =
            accOwner.accOwnerRoles[accOwner.accOwnerRoles.length - 1];
          const rolesString = accOwner.accOwnerRoles.slice(0, -1).join(', ');

          throw new HttpException(
            `This action can be performed by account owner who is: ${
              accOwner.accOwnerRoles.length === 1
                ? `${roles[0]}`
                : `${rolesString} or ${lastRole}`
            }.`,
            HttpStatus.UNAUTHORIZED,
          );
        }
      } else {
        throw new HttpException(
          'Only the account owner can perform this action.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (roles.length > 0) {
      if (
        compareRoles(
          roles,
          user.roles.map((role) => role.type),
        )
      ) {
        return true;
      }
      if (accOwner.checkAccOwner) {
        if (
          accOwner.checkAccOwner &&
          !accOwner.allowAnyRole &&
          accOwner.accOwnerRoles.length === 0
        ) {
          throw new HttpException(
            'There is no account ownership for this action.',
            HttpStatus.BAD_REQUEST,
          );
        }
        if (request.user.id === request.params.id && accOwner.allowAnyRole) {
          return true;
        }
        if (request.user.id === request.params.id && !accOwner.allowAnyRole) {
          if (accOwner.accOwnerRoles.length === 0) {
            throw new HttpException(
              "You have to specify the user's allowed roles",
              HttpStatus.BAD_REQUEST,
            );
          }
          if (
            compareRoles(
              accOwner.accOwnerRoles,
              user.roles.map((role) => role.type),
            )
          ) {
            return true;
          } else {
            const lastRole =
              accOwner.accOwnerRoles[accOwner.accOwnerRoles.length - 1];
            const rolesString = accOwner.accOwnerRoles.slice(0, -1).join(', ');

            throw new HttpException(
              `This action can be performed by account owner who is: ${
                accOwner.accOwnerRoles.length === 1
                  ? `${roles[0]}`
                  : `${rolesString} or ${lastRole}`
              }.`,
              HttpStatus.UNAUTHORIZED,
            );
          }
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
  }
}

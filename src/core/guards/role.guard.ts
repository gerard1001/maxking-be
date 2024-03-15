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
import { log } from 'console';
import { ArticleRepository } from 'src/modules/article/providers/article.repository';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly articleRepository: ArticleRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const metadata = this.reflector.get<IGuardMetadata>(
      'metadata',
      context.getHandler(),
    );
    const roles = metadata.roles;
    const accOwner = metadata.checkAccOwner;
    const request = context.switchToHttp().getRequest();
    const user = await this.userRepository.findById(request.user.id);

    if (!user) {
      throw new HttpException(
        'Logged-in user is unidentified',
        HttpStatus.NOT_FOUND,
      );
    }
    const articleUserId = (
      await this.articleRepository.findById(request.params.id)
    ).authorId;
    const route = request.route.path.split('/')[1];

    let paramUser = '';

    switch (route) {
      case 'article':
        paramUser = articleUserId;
        break;
      default:
        paramUser = request.params.id;
    }

    log(paramUser);

    if (roles.length === 0 && !accOwner) {
      throw new HttpException(
        'You did not provide a role.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (roles?.length === 0 && accOwner) {
      if (request?.user?.id === request?.params?.id) {
        return true;
      } else {
        throw new HttpException(
          'Only the account owner can perform this action.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (roles?.length > 0 && accOwner) {
      if (
        request?.user?.id === request?.params?.id ||
        compareRoles(
          roles,
          user.roles.map((role) => role.type),
        )
      ) {
        return true;
      } else {
        throw new HttpException(
          'You are not authorized to perform this action',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
    if (roles?.length > 0 && !accOwner) {
      if (
        compareRoles(
          roles,
          user.roles.map((role) => role.type),
        )
      ) {
        return true;
      } else {
        throw new HttpException(
          'You are not authorized to perform this action',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
    /* if (roles.length > 0) {
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
    } */
  }
}

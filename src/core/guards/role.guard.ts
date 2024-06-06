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
import { compareRoles } from '../functions/algorithms.function';
import { ArticleRepository } from 'src/modules/article/providers/article.repository';
import { CommentRepository } from 'src/modules/comment/providers/comment.repository';
import { ReplyRepository } from 'src/modules/reply/providers/reply.repository';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly articleRepository: ArticleRepository,
    private readonly commentRepository: CommentRepository,
    private readonly replyRepository: ReplyRepository,
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
    const user = await this.userRepository.findById(request?.user?.id);

    if (!user) {
      throw new HttpException(
        'Logged-in user is unidentified',
        HttpStatus.NOT_FOUND,
      );
    }
    const articleUserId = await this.articleRepository
      .findById(request.params.id)
      .then((res) => res.authorId)
      .catch((_) => {
        return null;
      });
    const commentUserId = await this.commentRepository
      .findById(request.params.id)
      .then((res) => {
        return res.userId;
      })
      .catch((_) => {
        return null;
      });
    const replyUserId = await this.replyRepository
      .findById(request.params.id)
      .then((res) => {
        return res.userId;
      })
      .catch((_) => {
        return null;
      });

    const route = request.route.path.split('/')[3];

    let paramUser = '';

    if (accOwner)
      switch (route) {
        case 'article':
          paramUser = articleUserId;
          break;
        case 'comment':
          paramUser = commentUserId;
          break;
        case 'reply':
          paramUser = replyUserId;
          break;
        default:
          paramUser = request.params.id;
      }

    if (roles.length === 0 && !accOwner) {
      throw new HttpException(
        'You did not provide a role.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (roles?.length === 0 && accOwner) {
      if (request?.user?.id === paramUser) {
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
        request.user.id === paramUser ||
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
  }
}

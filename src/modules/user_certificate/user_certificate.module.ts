// import { Module, forwardRef } from '@nestjs/common';
// import { UserCertificateService } from './user_certificate.service';
// import { UserCertificateController } from './user_certificate.controller';
// import { userCertificateProviders } from 'src/database/providers/entities.providers';
// import { UserCertificateRepository } from './providers/user_certificate.repository';
// import { UserModule } from '../user/user.module';
// import { CertificateModule } from '../certificate/certificate.module';
// import { AuthModule } from '../auth/auth.module';
// import { CommentModule } from '../comment/comment.module';
// import { ReplyModule } from '../reply/reply.module';

// @Module({
//   imports: [
//     forwardRef(() => UserModule),
//     forwardRef(() => AuthModule),
//     forwardRef(() => CertificateModule),
//     forwardRef(() => CommentModule),
//     forwardRef(() => ReplyModule),
//   ],
//   controllers: [UserCertificateController],
//   providers: [
//     UserCertificateService,
//     UserCertificateRepository,
//     ...userCertificateProviders,
//   ],
//   exports: [
//     UserCertificateService,
//     UserCertificateRepository,
//     ...userCertificateProviders,
//   ],
// })
// export class UserCertificateModule {}

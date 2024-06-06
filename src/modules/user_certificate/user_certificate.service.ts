// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { UserCertificateRepository } from './providers/user_certificate.repository';
// import { ICount, IResponse } from 'src/core/interfaces/response.interface';
// import { CertificateRepository } from '../certificate/providers/certificate.repository';
// import { UserRepository } from '../user/providers/user.repository';
// import { UserCertificate } from './model/user_certificate.model';

// @Injectable()
// export class UserCertificateService {
//   constructor(
//     private readonly userCertificateRepo: UserCertificateRepository,
//     private readonly userRepo: UserRepository,
//     private readonly articlRepo: CertificateRepository,
//   ) {}

//   async create(id: string, req: any): Promise<IResponse<UserCertificate>> {
//     try {
//       const userId = req?.user?.id;
//       const user = await this.userRepo.findById(userId);
//       if (!user) {
//         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
//       }
//       const certificate = await this.articlRepo.findById(id);
//       if (!certificate) {
//         throw new HttpException('Certificate not found', HttpStatus.NOT_FOUND);
//       }
//       if (!user) {
//         throw new HttpException('User not found', HttpStatus.NOT_FOUND);
//       }
//       const userCertificate =
//         await this.userCertificateRepo.findByUserIdAndCertificateId(
//           userId,
//           certificate.id,
//         );
//       if (userCertificate) {
//         await this.userCertificateRepo.deleteByUserAndCertificate(
//           userCertificate.userId,
//           userCertificate.certificateId,
//         );

//         return {
//           statusCode: HttpStatus.OK,
//           message: 'User certificate deleted successfully',
//           data: userCertificate,
//         };
//       }
//       const newUserCertificate = await this.userCertificateRepo.create({
//         userId,
//         certificateId: id,
//       });
//       return {
//         statusCode: HttpStatus.OK,
//         message: 'User certificate created successfully',
//         data: newUserCertificate,
//       };
//     } catch (error) {
//       throw new HttpException(
//         error.message || 'Server Error',
//         error.status || HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   async findAll(): Promise<IResponse<UserCertificate[]>> {
//     try {
//       const userCertificates = await this.userCertificateRepo.findAll();
//       return {
//         statusCode: HttpStatus.OK,
//         message: 'User certificates retrieved successfully',
//         data: userCertificates,
//       };
//     } catch (error) {
//       throw new HttpException(
//         error.message || 'Server Error',
//         error.status || HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   async findById(id: string): Promise<IResponse<UserCertificate>> {
//     try {
//       const userCertificate = await this.userCertificateRepo.findById(id);
//       if (!userCertificate) {
//         throw new HttpException(
//           'User certificate not found',
//           HttpStatus.NOT_FOUND,
//         );
//       }
//       return {
//         statusCode: HttpStatus.OK,
//         message: 'User certificate retrieved successfully',
//         data: userCertificate,
//       };
//     } catch (error) {
//       throw new HttpException(
//         error.message || 'Server Error',
//         error.status || HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   async findByUserIdAndCertificateId(
//     userId: string,
//     certificateId: string,
//   ): Promise<IResponse<UserCertificate>> {
//     try {
//       const userCertificate =
//         await this.userCertificateRepo.findByUserIdAndCertificateId(
//           userId,
//           certificateId,
//         );
//       if (!userCertificate) {
//         throw new HttpException(
//           'User certificate not found',
//           HttpStatus.NOT_FOUND,
//         );
//       }
//       return {
//         statusCode: HttpStatus.OK,
//         message: 'User certificate retrieved successfully',
//         data: userCertificate,
//       };
//     } catch (error) {
//       throw new HttpException(
//         error.message || 'Server Error',
//         error.status || HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   async deleteOne(id: string): Promise<IResponse<ICount>> {
//     try {
//       const count = await this.userCertificateRepo.deleteOne(id);
//       return {
//         statusCode: HttpStatus.OK,
//         message: 'User certificate deleted successfully',
//         data: { count },
//       };
//     } catch (error) {
//       throw new HttpException(
//         error.message || 'Server Error',
//         error.status || HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }

//   async deleteMultiple(ids: string[]): Promise<IResponse<ICount>> {
//     try {
//       for (const id of ids) {
//         const userCertificate = await this.userCertificateRepo.findById(id);
//         if (!userCertificate) {
//           throw new HttpException(
//             'User certificate not found',
//             HttpStatus.NOT_FOUND,
//           );
//         }
//       }
//       const count = await this.userCertificateRepo.deleteMultiple(ids);
//       return {
//         statusCode: HttpStatus.OK,
//         message: 'User certificates deleted successfully',
//         data: { count },
//       };
//     } catch (error) {
//       throw new HttpException(
//         error.message || 'Server Error',
//         error.status || HttpStatus.INTERNAL_SERVER_ERROR,
//       );
//     }
//   }
// }

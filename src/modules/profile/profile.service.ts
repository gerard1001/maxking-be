import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileRepository } from './providers/profile.repository';
import { IResponse } from 'src/core/interfaces/response.interface';
import { CloudinaryService } from 'src/core/upload/cloudinary/cloudinary.service';
import { UserRepository } from '../user/providers/user.repository';
import { Profile } from './model/profile.model';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepo: ProfileRepository,
    private readonly userRepo: UserRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createProfileDto: CreateProfileDto,
    picture: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Profile>> {
    try {
      const { birthDate, userId } = createProfileDto;
      const user = await this.userRepo.findById(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const file =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(picture).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));

      const newProfile = await this.profileRepo.create({
        ...createProfileDto,
        userId,
        picture: file && file.secure_url,
        birthDate: new Date(birthDate),
      });

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Profile created successfully',
        data: newProfile,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Profile[]>> {
    try {
      const profiles = await this.profileRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Profile retrieved successfully',
        data: profiles,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Profile>> {
    try {
      const profile = await this.profileRepo.findById(id);
      if (!profile) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Profile retrieved successfully',
        data: profile,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByUserId(userId: string): Promise<IResponse<Profile>> {
    try {
      const profile = await this.profileRepo.findByUserId(userId);
      if (!profile) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Profile retrieved successfully',
        data: profile,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
    picture: Express.Multer.File[],
    coverLetter: Express.Multer.File[],
    req: Request,
  ): Promise<IResponse<Profile>> {
    try {
      const profile = await this.profileRepo.findById(id);
      if (!profile) {
        throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
      }
      const file =
        picture &&
        (await this.cloudinaryService.uploadImage(picture[0]).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));

      console.log(file);
      const letterFile =
        coverLetter &&
        (await this.cloudinaryService
          .uploadImage(coverLetter[0])
          .catch((err) => {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
          }));

      const updatedProfile = await this.profileRepo.update(id, {
        ...updateProfileDto,
        picture: picture ? file?.secure_url : profile.picture,
        coverLetter: coverLetter ? letterFile.secure_url : profile.coverLetter,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Profile updated successfully',
        data: updatedProfile[1][0],
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

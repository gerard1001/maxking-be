import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { CollaboratorRepository } from './providers/collaborator.repository';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Collaborator } from './model/collaborator.model';
import { CloudinaryService } from 'src/core/upload/cloudinary/cloudinary.service';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly collaboratorRepo: CollaboratorRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createCollaboratorDto: CreateCollaboratorDto,
    image: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Collaborator>> {
    try {
      const { name, url } = createCollaboratorDto;
      const collaboratorExists = await this.collaboratorRepo.findByName(
        name.trim(),
      );
      if (collaboratorExists) {
        throw new HttpException(
          `Collaborator: ${name} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const file =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(image).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));
      const collaborator = await this.collaboratorRepo.create({
        name: name.trim(),
        image: req['file'] ? file?.secure_url : null,
        url,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Collaborator added successfully',
        data: collaborator,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Collaborator[]>> {
    try {
      const collaborators = await this.collaboratorRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Collaborators retrieved successfully',
        data: collaborators,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Collaborator>> {
    try {
      const collaborator = await this.collaboratorRepo.findById(id);
      if (!collaborator) {
        throw new HttpException('Collaborator not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Collaborator retrieved successfully',
        data: collaborator,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByName(name: string): Promise<IResponse<Collaborator>> {
    try {
      const collaborator = await this.collaboratorRepo.findByName(name);
      if (!collaborator) {
        throw new HttpException('Collaborator not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Collaborator retrieved successfully',
        data: collaborator,
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
    updateCollaboratorDto: UpdateCollaboratorDto,
    image: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Collaborator>> {
    try {
      const { name } = updateCollaboratorDto;
      const nameCollaborator = await this.collaboratorRepo.findByName(name);
      const idCollaborator = await this.collaboratorRepo.findById(id);
      if (!idCollaborator) {
        throw new HttpException('Collaborator not found', HttpStatus.NOT_FOUND);
      }
      if (nameCollaborator && nameCollaborator.id !== idCollaborator.id) {
        throw new HttpException(
          `Collaborator: ${name} already exists`,
          HttpStatus.CONFLICT,
        );
      }
      const file =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(image).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));
      const newCollaborator = await this.collaboratorRepo.update(id, {
        ...updateCollaboratorDto,
        image: req['file'] ? file?.secure_url : idCollaborator.image,
      });
      return {
        statusCode: HttpStatus.OK,
        message: 'Collaborator updated successfully',
        data: newCollaborator[1][0],
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOne(id: string): Promise<IResponse<ICount>> {
    try {
      const count = await this.collaboratorRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Collaborator deleted successfully',
        data: { count },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

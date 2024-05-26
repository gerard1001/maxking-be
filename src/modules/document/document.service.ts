import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { ICount, IResponse } from 'src/core/interfaces/response.interface';
import { Document } from './model/document.model';
import { DocumentRepository } from './providers/document.repository';
import { CloudinaryService } from 'src/core/upload/cloudinary/cloudinary.service';

@Injectable()
export class DocumentService {
  constructor(
    private readonly documentRepo: DocumentRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    createDocumentDto: CreateDocumentDto,
    file: Express.Multer.File,
    req: Request,
  ): Promise<IResponse<Document>> {
    try {
      const { authorName, title, summary, type, price, publishedOn } =
        createDocumentDto;

      const reqFile =
        req['file'] &&
        (await this.cloudinaryService.uploadImage(file).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));

      if (!reqFile || !req['file']) {
        throw new HttpException('File not uploaded', HttpStatus.BAD_REQUEST);
      }

      const newDocument = await this.documentRepo.create({
        authorName,
        title,
        summary,
        type,
        price,
        publishedOn: new Date(),
        file: req['file'] && reqFile.secure_url,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Document added successfully',
        data: newDocument,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<IResponse<Document[]>> {
    try {
      const documents = await this.documentRepo.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Documents retrieved successfully',
        data: documents,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<IResponse<Document>> {
    try {
      const document = await this.documentRepo.findById(id);
      if (!document) {
        throw new HttpException('Document not found', HttpStatus.NOT_FOUND);
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Document retrieved successfully',
        data: document,
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
      const count = await this.documentRepo.deleteOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Document deleted successfully',
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

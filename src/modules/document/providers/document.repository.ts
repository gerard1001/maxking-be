import { Inject, Injectable } from '@nestjs/common';
import { DOCUMENT_MODEL } from 'src/core/constants';
import { Document } from '../model/document.model';

@Injectable()
export class DocumentRepository {
  constructor(
    @Inject(DOCUMENT_MODEL)
    private readonly documentModel: typeof Document,
  ) {}

  async create(createDocumentDto: any): Promise<Document> {
    return await this.documentModel.create(createDocumentDto);
  }

  async findAll(): Promise<Document[]> {
    return await this.documentModel.findAll();
  }

  async findById(id: string) {
    return await this.documentModel.findByPk(id);
  }

  async update(
    id: string,
    updateDocumentDto: any,
  ): Promise<[number, Document[]]> {
    return await this.documentModel.update(updateDocumentDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.documentModel.destroy({ where: { id } });
  }
}

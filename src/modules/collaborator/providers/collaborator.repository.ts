import { Inject, Injectable } from '@nestjs/common';
import { COLLABORATOR_MODEL } from 'src/core/constants';
import { Collaborator } from '../model/collaborator.model';
import { CreateCollaboratorDto } from '../dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from '../dto/update-collaborator.dto';
import { Op } from 'sequelize';

@Injectable()
export class CollaboratorRepository {
  constructor(
    @Inject(COLLABORATOR_MODEL)
    private readonly collaboratorModel: typeof Collaborator,
  ) {}

  async create(
    createCollaboratorDto: CreateCollaboratorDto,
  ): Promise<Collaborator> {
    return await this.collaboratorModel.create(createCollaboratorDto);
  }

  async findAll(): Promise<Collaborator[]> {
    return await this.collaboratorModel.findAll();
  }

  async findById(id: string) {
    return await this.collaboratorModel.findByPk(id);
  }

  async findByName(name: string) {
    return await this.collaboratorModel.findOne({
      where: { name: { [Op.iLike]: `%${name}` } },
    });
  }

  async update(
    id: string,
    updateCollaboratorDto: UpdateCollaboratorDto,
  ): Promise<[number, Collaborator[]]> {
    return await this.collaboratorModel.update(updateCollaboratorDto, {
      where: { id },
      returning: true,
    });
  }

  async deleteOne(id: string): Promise<number> {
    return await this.collaboratorModel.destroy({ where: { id } });
  }
}

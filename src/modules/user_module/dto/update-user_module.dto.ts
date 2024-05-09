import { PartialType } from '@nestjs/mapped-types';
import { CreateUserModuleDto } from './create-user_module.dto';

export class UpdateUserModuleDto extends PartialType(CreateUserModuleDto) {}

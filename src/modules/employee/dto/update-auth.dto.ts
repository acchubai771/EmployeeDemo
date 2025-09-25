import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from '../dto/create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}

// src/modules/department/service/department.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from 'src/entities/department.entity';
import { CreateDepartmentDto } from '../dto/create-department.dto';

@Injectable()
export class DepartmentService {
  findOne(id: string): Department | PromiseLike<Department> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const newDepartment = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(newDepartment);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find();
  }
}

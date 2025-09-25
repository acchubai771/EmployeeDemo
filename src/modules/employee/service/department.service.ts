// src/modules/department/service/department.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from 'src/modules/employee/entities/department.entity';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { UpdateDepartmentDto } from '../dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async findOne(id: string): Promise<Department> {
    const department = await this.departmentRepository.findOneBy({id})
    if (!department){
    throw new Error(`Department with id "${id}"not found.`);
  }
  return department
  }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const newDepartment = this.departmentRepository.create(createDepartmentDto);
    return this.departmentRepository.save(newDepartment);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  async findOneById(id: string): Promise<Department> {
    const department = await this.departmentRepository.findOne({ where: { id }});
    if (!department) throw new NotFoundException('Department not found');
    return department;
  }

  async update(id: string, dto:UpdateDepartmentDto){
    const existing = await this. findOneById(id);
    const update = this.departmentRepository.merge(existing, dto);
    return this.departmentRepository.save(update);
  }
  async remove(id: string) {
    const existing = await this.findOneById(id);
    await this.departmentRepository.remove(existing);
    return ( success => true);
  }

}

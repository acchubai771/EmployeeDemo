import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { DepartmentService } from '../service/department.service';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { Department } from 'src/entities/department.entity';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentService.create(createDepartmentDto);
  }
  @Get()
  findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id : string): Promise<Department> {
    return this.departmentService.findOne(id);
  }
}

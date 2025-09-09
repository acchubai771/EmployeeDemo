// src/employee/employee.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Query } from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { IEmployee } from 'src/entities/employee.entity';
import { PaginationDTO } from '../dto/pagination-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

 @Get()
  async findAll(@Query() paginationDto: PaginationDTO): Promise<IEmployee[]> {
  return this.employeeService.findAllWithPagination(paginationDto.page, paginationDto.limit);
  }

 @Get(':id')
  async findOne(@Param('id') id: number): Promise<IEmployee> {
    return this.employeeService.findOne(id);
  }

  @Post()
  create (@Body() createEmployeeDto: CreateEmployeeDto ){
    return this.employeeService.create(createEmployeeDto)
  }

  @Delete(':id')
  remove(@Param('id')id: string)  {
    return this.employeeService.remove(id)
  }
}
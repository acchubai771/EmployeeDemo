// src/employee/employee.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Query, Patch, Put, ParseIntPipe } from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { IEmployee } from 'src/modules/employee/entities/employee.entity';
import { PaginationDTO } from '../dto/pagination-employee.dto';
import { UpdateStatusEmployeeDTO } from '../dto/update-status-employee.dto';
import { UpdateEmployeeDTO } from '../dto/update-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  findAll(): Promise<IEmployee[]> {
    return this.employeeService.findAll();
  }

 @Get(':id')
  async findOne(@Param('id') id: string): Promise<IEmployee> { //đang sửa sai
    return this.employeeService.findOne(id);
  }
  // @Put(':id')
  //   update(
  //     @Param('id', ParseIntPipe) id: string,
  //     @Body() dto: UpdateEmployeeDTO,
  //   ){
  //     return this.employeeService.update(id, dto)
  //   }

  @Put(':id/status')
  async updateStatus (
    @Param('id') id: string,
    @Body() UpdateStatusEmployeeDTO: UpdateStatusEmployeeDTO,): Promise<IEmployee> {
    return this.employeeService.updateStatus(id, UpdateStatusEmployeeDTO.status)
  }

  @Post()
  create (@Body() createEmployeeDto: CreateEmployeeDto ){
    return this.employeeService.create(createEmployeeDto)
  }

  @Delete(':id')
  remove (@Param('id')id: string)  {
    return this.employeeService.remove(id) 
  
  }
}
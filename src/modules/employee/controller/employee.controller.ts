// src/employee/employee.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Query, Patch } from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { IEmployee } from 'src/entities/employee.entity';
import { PaginationDTO } from '../dto/pagination-employee.dto';
import { UpdateStatusEmployeeDTO } from '../dto/update-status-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

 @Get()
  async findAll(@Query() paginationDto: PaginationDTO): Promise<IEmployee[]> {
  return this.employeeService.findAllWithPagination(paginationDto.page, paginationDto.limit);
  }

 @Get(':id')
  async findOne(@Param('id') id: string): Promise<IEmployee> {
    return this.employeeService.findOne(id);
  }

  @Patch(':id/status')
  async updateStatus (
    @Param('id') id: string,
    @Body() UpdateStatusEmployeeDTO: UpdateStatusEmployeeDTO,): Promise<IEmployee> {
    return this.employeeService.updateStatus(id, UpdateStatusEmployeeDTO.status)
  }
  
  // @Get('inactive') 
  // async getInactiveEmployee (): Promise<IEmployee[]>{
  //   return this.employeeService.findInactiveEmployee()
  // }


  @Post()
  create (@Body() createEmployeeDto: CreateEmployeeDto ){
    return this.employeeService.create(createEmployeeDto)
  }

  @Delete(':id')
  remove (@Param('id')id: string)  {
    return this.employeeService.remove(id)
  }
}
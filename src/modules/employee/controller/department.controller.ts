import { Controller, Post, Get, Body, Param, Put, ParseIntPipe, Delete } from '@nestjs/common';
import { DepartmentService } from '../service/department.service';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { Department } from 'src/modules/employee/entities/department.entity';
import { UpdateDepartmentDto } from '../dto/update-department.dto';

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

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: UpdateDepartmentDto,
  ){
    return this.departmentService.update(id, dto);
  }
  
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.departmentService.remove(id);
  }
    }
  

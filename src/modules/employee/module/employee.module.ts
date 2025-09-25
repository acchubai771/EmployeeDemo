// src/employee/employee.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from '../controller/employee.controller';
import { EmployeeService } from '../service/employee.service';
import { Employee } from 'src/modules/employee/entities/employee.entity';
import { Department } from 'src/modules/employee/entities/department.entity';
import { Position } from 'src/modules/employee/entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department, Position])],
  controllers: [EmployeeController], 
  providers: [EmployeeService],
})
export class EmployeeModule {}
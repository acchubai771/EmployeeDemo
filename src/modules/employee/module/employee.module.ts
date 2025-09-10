// src/employee/employee.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from '../controller/employee.controller';
import { EmployeeService } from '../service/employee.service';
import { Employee } from 'src/entities/employee.entity';
import { Department } from 'src/entities/department.entity';
import { Position } from 'src/entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department, Position])],
  controllers: [EmployeeController], 
  providers: [EmployeeService],
})
export class EmployeeModule {}
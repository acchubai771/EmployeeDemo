import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from '../controller/employee.controller';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../entities/employee.entity';
import { Department } from '../entities/department.entity';
import { Position } from '../entities/position.entity';
import { Work } from '../entities/work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Department, Position, Work])],
  controllers: [EmployeeController], 
  providers: [EmployeeService],
})
export class EmployeeModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../entities/department.entity';
import { DepartmentService } from '../service/department.service'; 
import { DepartmentController } from '../controller/department.controller'; 

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}
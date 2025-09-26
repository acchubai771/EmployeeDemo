import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkController } from '../controller/work.controller';
import { WorkService } from '../service/work.service';
import { Work } from '../entities/work.entity';
import { Position } from '../entities/position.entity';
import { Employee } from '../entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Work, Position, Employee])],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}

import { Module } from '@nestjs/common';
import { PositionController } from '../controller/position.controller';
import { PositionService } from '../service/position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from '../entities/position.entity';
import { Department } from '../entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position, Department])],
  controllers: [PositionController],
  providers: [PositionService]
})
export class PositionModule {}

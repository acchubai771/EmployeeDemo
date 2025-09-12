import { Module } from '@nestjs/common';
import { PositionController } from '../controller/position.controller';
import { PositionService } from '../service/position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from 'src/entities/position.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  controllers: [PositionController],
  providers: [PositionService]
})
export class PositionModule {}

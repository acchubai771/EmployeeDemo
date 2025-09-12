import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from 'src/entities/position.entity';
import { createPositionDto } from '../dto/create-position.dto';

@Injectable()
export class PositionService {
    findOne(id: string): Position | PromiseLike<Position> {
        throw new Error('Method not implemented.');
    }
    constructor(
        @InjectRepository(Position)
        private positionRepository: Repository<Position>,
    ) {}

    async create(createPositionDto: createPositionDto): Promise<Position>{
        const newPosition = this.positionRepository.create(createPositionDto)
        return this.positionRepository.save(newPosition)
}
    async findAll(): Promise<Position[]>{
        return this.positionRepository.find()
    }
}

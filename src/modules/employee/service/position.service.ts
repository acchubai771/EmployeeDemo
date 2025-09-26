import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from '../entities/position.entity';
import { Department } from '../entities/department.entity';
import { CreatePositionDto } from '../dto/create-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';

@Injectable()
export class PositionService {
    constructor(
        @InjectRepository(Position)
        private positionRepository: Repository<Position>,
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>,
    ) {}

    async create(createPositionDto: CreatePositionDto): Promise<Position> {
        // Kiểm tra department có tồn tại không
        const department = await this.departmentRepository.findOne({ 
            where: { id: createPositionDto.department_id } 
        });
        if (!department) {
            throw new BadRequestException('Department not found');
        }

        const newPosition = this.positionRepository.create(createPositionDto);
        return this.positionRepository.save(newPosition);
    }

    async findAll(): Promise<Position[]> {
        return this.positionRepository.find({
            relations: ['department']
        });
    }

    async findOne(id: number): Promise<Position> {
        const position = await this.positionRepository.findOne({ 
            where: { id },
            relations: ['department']
        });
        if (!position) {
            throw new NotFoundException(`Position with id "${id}" not found`);
        }
        return position;
    }

    async update(id: number, dto: UpdatePositionDto): Promise<Position> {
        const existing = await this.findOne(id);
        
        // Nếu có department_id trong update, kiểm tra department có tồn tại
        if (dto.department_id) {
            const department = await this.departmentRepository.findOne({ 
                where: { id: dto.department_id } 
            });
            if (!department) {
                throw new BadRequestException('Department not found');
            }
        }

        const updated = this.positionRepository.merge(existing, dto);
        return this.positionRepository.save(updated);
    }

    async remove(id: number): Promise<void> {
        const result = await this.positionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Position with ID "${id}" not found.`);
        }
    }
}

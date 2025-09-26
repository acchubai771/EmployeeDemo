import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from '../entities/work.entity';
import { Position } from '../entities/position.entity';
import { Employee } from '../entities/employee.entity';
import { CreateWorkDto } from '../dto/create-work.dto';
import { UpdateWorkDto } from '../dto/update-work.dto';

@Injectable()
export class WorkService {
    constructor(
        @InjectRepository(Work)
        private workRepository: Repository<Work>,
        @InjectRepository(Position)
        private positionRepository: Repository<Position>,
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>,
    ) {}

    async create(createWorkDto: CreateWorkDto): Promise<Work> {
        // Kiểm tra position có tồn tại không
        const position = await this.positionRepository.findOne({ 
            where: { id: createWorkDto.position_id } 
        });
        if (!position) {
            throw new BadRequestException('Position not found');
        }

        // Kiểm tra employee có tồn tại không
        const employee = await this.employeeRepository.findOne({ 
            where: { id: createWorkDto.employee_id } 
        });
        if (!employee) {
            throw new BadRequestException('Employee not found');
        }

        const newWork = this.workRepository.create(createWorkDto);
        return this.workRepository.save(newWork);
    }

    async findAll(): Promise<Work[]> {
        return this.workRepository.find({
            relations: ['position', 'employee', 'position.department']
        });
    }

    async findOne(id: number): Promise<Work> {
        const work = await this.workRepository.findOne({ 
            where: { id },
            relations: ['position', 'employee', 'position.department']
        });
        if (!work) {
            throw new NotFoundException(`Work with id "${id}" not found`);
        }
        return work;
    }

    async update(id: number, dto: UpdateWorkDto): Promise<Work> {
        const existing = await this.findOne(id);
        
        // Nếu có position_id trong update, kiểm tra position có tồn tại
        if (dto.position_id) {
            const position = await this.positionRepository.findOne({ 
                where: { id: dto.position_id } 
            });
            if (!position) {
                throw new BadRequestException('Position not found');
            }
        }

        // Nếu có employee_id trong update, kiểm tra employee có tồn tại
        if (dto.employee_id) {
            const employee = await this.employeeRepository.findOne({ 
                where: { id: dto.employee_id } 
            });
            if (!employee) {
                throw new BadRequestException('Employee not found');
            }
        }

        const updated = this.workRepository.merge(existing, dto);
        return this.workRepository.save(updated);
    }

    async remove(id: number): Promise<void> {
        const result = await this.workRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Work with ID "${id}" not found.`);
        }
    }

    // Tìm tất cả công việc của một employee
    async findByEmployee(employeeId: number): Promise<Work[]> {
        return this.workRepository.find({
            where: { employee_id: employeeId },
            relations: ['position', 'position.department']
        });
    }

    // Tìm tất cả công việc của một position
    async findByPosition(positionId: number): Promise<Work[]> {
        return this.workRepository.find({
            where: { position_id: positionId },
            relations: ['employee']
        });
    }
}

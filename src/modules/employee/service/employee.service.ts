import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from 'src/entities/employee.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { IEmployee } from 'src/entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(newEmployee);
  }

  async findAll(): Promise<IEmployee[]> {
    const data = await this.employeeRepository.find();
    return data;
  }

  async findOne(id: number): Promise<IEmployee> {
    const employee = await this.employeeRepository.findOneBy({id});
    if (!employee){
      throw new Error(`Employee with id "${id}" not found`)
    }
    return employee 
  }
  

  async remove(id: string) :Promise<void>{
    await this.employeeRepository.delete(id)
  }
}

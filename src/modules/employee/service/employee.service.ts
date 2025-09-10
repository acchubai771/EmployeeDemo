import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAllWithPagination( page: number = 1, limit: number = 10): Promise<IEmployee[]>{
   const skip = (page - 1) * limit
   const data = await this.employeeRepository.find({
    skip: skip,
    take: limit,
    where: {status: 1},
   });
   return data 
  }

  async updateStatus (id: string, status: number): Promise<IEmployee>{
    const employee = await this.employeeRepository.findOneBy({id});

  if (!employee) {
    throw new NotFoundException('Employee with "${id}" not found')
  }
  employee.status = status;
  return this.employeeRepository.save(employee)
  }


  async findOne(id: string): Promise<IEmployee> {
    const employee = await this.employeeRepository.findOneBy({id, status : 1});
    if (!employee){
      throw new Error(`Employee with id "${id}" not found`)
    }
    return employee 
  }
  
  async findInactiveEmployee(): Promise<IEmployee[]> {
    return this.employeeRepository.find({
      where: {status: 0},

    });
    
  }
  

  async remove(id: string) :Promise<void>{
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID "${id}" not found.`);
    }
  }
  
}
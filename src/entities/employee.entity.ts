import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Department } from './department.entity';
import { Position } from './position.entity';

@Entity('employee')
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'date' })
    birthday: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    salary: number;

    @Column({ type: 'smallint', default: 1 })
    status: number;
   
    @Column({ type: 'uuid' })
    department_id: string;

    @Column({ type: 'uuid' })
    position_id: string;

    @ManyToOne(() => Department)
    @JoinColumn({ name: 'department_id' })
    department: Department;

    @ManyToOne(() => Position)
    @JoinColumn({ name: 'position_id' })
    position: Position;
}
// src/entities/employee.entity.ts

export interface IEmployee {
  id: string;
  name: string;
  birthday: Date
  salary: number;
  position_id: string;
  department_id: string;
  status: number; 
}
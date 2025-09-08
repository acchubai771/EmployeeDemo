import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  salary: number;

  @Column({ type: 'varchar', length: 100 })
  position: string;

  @Column({ type: 'varchar', length: 100 })
  department: string;

  @Column({ type: 'smallint', default: 1 })
  status: number;
}
// src/entities/employee.entity.ts
export interface IEmployee {
  id: number;
  name: string;
  birthday: Date
  salary: number;
  position: string;
  department: string;
}
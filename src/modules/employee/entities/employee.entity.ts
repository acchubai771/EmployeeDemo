import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Work } from './work.entity';

@Entity('employee')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'date', nullable: true })
    birthday: Date;

    @Column({ type: 'smallint', default: 1 })
    status: number;

    @OneToMany(() => Work, work => work.employee)
    works: Work[];
}

export interface IEmployee {
    id: number;
    name: string;
    birthday: Date;
    status: number;
}

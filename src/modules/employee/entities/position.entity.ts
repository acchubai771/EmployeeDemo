import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Department } from "./department.entity";
import { Work } from "./work.entity";

@Entity('position')
export class Position {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    department_id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'smallint', default: 1 })
    status: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    salary: number;

    @ManyToOne(() => Department, department => department.positions)
    @JoinColumn({ name: 'department_id' })
    department: Department;

    @OneToMany(() => Work, work => work.position)
    works: Work[];
}
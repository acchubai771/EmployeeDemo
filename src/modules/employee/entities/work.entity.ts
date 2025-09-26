import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Position } from "./position.entity";
import { Employee } from "./employee.entity";

@Entity('work')
export class Work {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    position_id: number;

    @Column({ type: 'int' })
    employee_id: number;

    @Column({ type: 'smallint', default: 1 })
    status: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    salary: number;

    @ManyToOne(() => Position, position => position.works)
    @JoinColumn({ name: 'position_id' })
    position: Position;

    @ManyToOne(() => Employee, employee => employee.works)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;
}

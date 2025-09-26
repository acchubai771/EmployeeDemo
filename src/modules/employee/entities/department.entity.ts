import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Position } from "./position.entity";

@Entity('department')
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'smallint', default: 1 })
    status: number;

    @OneToMany(() => Position, position => position.department)
    positions: Position[];
}
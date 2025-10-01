import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 255, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 255 })
	password_hash: string;

	@Column({ type: 'varchar', length: 50, default: 'user' })
	role: string;

	@Column({ type: 'boolean', default: true })
	is_active: boolean;

	@Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
	created_at: Date;
}


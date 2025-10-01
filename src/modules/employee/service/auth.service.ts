import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private readonly userRepo: Repository<User>,
		private readonly jwtService: JwtService,
	) {}

	async register(dto: RegisterDto) {
		const existing = await this.userRepo.findOne({ where: { email: dto.email } });
		if (existing) throw new BadRequestException('Email already registered');
		const password_hash = await bcrypt.hash(dto.password, 10);
		const user = this.userRepo.create({ email: dto.email, password_hash, role: dto.role || 'user' });
		await this.userRepo.save(user);
		return { id: user.id, email: user.email, role: user.role };
	}

	async login(dto: LoginDto) {
		const user = await this.userRepo.findOne({ where: { email: dto.email, is_active: true } });
		if (!user) throw new UnauthorizedException('Invalid credentials');
		const ok = await bcrypt.compare(dto.password, user.password_hash);
		if (!ok) throw new UnauthorizedException('Invalid credentials');
		const payload = { sub: user.id, email: user.email, role: user.role };
		const access_token = await this.jwtService.signAsync(payload);
		return { access_token };
	}
}

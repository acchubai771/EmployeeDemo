import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePositionDto {
    @IsNumber()
    @IsNotEmpty()
    department_id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsOptional()
    status?: number;

    @IsNumber()
    @IsOptional()
    salary?: number;
}
import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWorkDto {
    @IsNumber()
    @IsNotEmpty()
    position_id: number;

    @IsNumber()
    @IsNotEmpty()
    employee_id: number;

    @IsNumber()
    @IsOptional()
    status?: number;

    @IsNumber()
    @IsOptional()
    salary?: number;
}

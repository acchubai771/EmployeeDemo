import { IsString, IsNotEmpty, IsDate, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    @Type(() => Date)
    @IsOptional()
    birthday?: Date;

    @IsNumber()
    @IsOptional()
    status?: number;
}
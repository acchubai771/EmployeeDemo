// src/employee/dto/create-employee.dto.ts
import { IsString, IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    birthday: Date;

    @IsNumber()
    @IsNotEmpty()
    salary: number;

    @IsString()
    @IsNotEmpty()
    position: string;

    @IsString()
    @IsNotEmpty()
    department: string;

    @IsNumber()
    @IsNotEmpty()
    status: number;
}


// export class CreateEmployeeDto {
    
  
//     name : string;

//     birthday: Date;

    
//     salary: number;

  
//     position: string;

//     department: string;

    
//     status: number;

// }
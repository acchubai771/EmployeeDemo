import { IsIn, IsNumber } from "class-validator";

export class UpdateStatusEmployeeDTO{
    @IsNumber()
    @IsIn([0, 1])
    status: number;
}
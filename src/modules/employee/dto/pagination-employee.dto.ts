import { IsNumberString, IsOptional } from "class-validator";

export class PaginationDTO{
    @IsNumberString()
    @IsOptional()
    page? : number;

    @IsNumberString()
    @IsOptional()
    limit?: number
}
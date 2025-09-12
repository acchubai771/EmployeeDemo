import { Get, Body, Controller, Post, Param } from '@nestjs/common';
import { PositionService } from '../service/position.service';
import { createPositionDto } from '../dto/create-position.dto';
import { Position } from 'src/entities/position.entity';


@Controller('position')
export class PositionController {
    constructor(private readonly positionService: PositionService){}

    @Post()
    create(@Body() createPositionDto: createPositionDto ): Promise<Position>{
    return this.positionService.create(createPositionDto)
}
    @Get()
    findAll(): Promise<Position[]> {
        return this.positionService.findAll()
    }
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Position>{
        return this.positionService.findOne(id)
    }
}

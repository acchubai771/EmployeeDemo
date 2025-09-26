import { Get, Body, Controller, Post, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { PositionService } from '../service/position.service';
import { CreatePositionDto } from '../dto/create-position.dto';
import { UpdatePositionDto } from '../dto/update-position.dto';

@Controller('position')
export class PositionController {
    constructor(private readonly positionService: PositionService){}

    @Post()
    create(@Body() createPositionDto: CreatePositionDto) {
        return this.positionService.create(createPositionDto);
    }

    @Get()
    findAll() {
        return this.positionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.positionService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdatePositionDto,
    ) {
        return this.positionService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.positionService.remove(id);
    }
}

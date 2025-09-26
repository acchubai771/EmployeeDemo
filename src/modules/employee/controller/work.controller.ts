import { Get, Body, Controller, Post, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { WorkService } from '../service/work.service';
import { CreateWorkDto } from '../dto/create-work.dto';
import { UpdateWorkDto } from '../dto/update-work.dto';

@Controller('work')
export class WorkController {
    constructor(private readonly workService: WorkService){}

    @Post()
    create(@Body() createWorkDto: CreateWorkDto) {
        return this.workService.create(createWorkDto);
    }

    @Get()
    findAll() {
        return this.workService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.workService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateWorkDto,
    ) {
        return this.workService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.workService.remove(id);
    }

    // Tìm tất cả công việc của một employee
    @Get('employee/:employeeId')
    findByEmployee(@Param('employeeId', ParseIntPipe) employeeId: number) {
        return this.workService.findByEmployee(employeeId);
    }

    // Tìm tất cả công việc của một position
    @Get('position/:positionId')
    findByPosition(@Param('positionId', ParseIntPipe) positionId: number) {
        return this.workService.findByPosition(positionId);
    }
}
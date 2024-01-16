import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { Users } from 'src/user/User';
import { AuthGuard } from 'src/guards/auth-guard';
import { TaskDto } from './dtos/task.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { query } from 'express';
import { GetTaskDto } from './dtos/get-task.dto';
import { plainToClass } from 'class-transformer';
import { PaginationMeta } from './dtos/pagination-meta.dto';

@Controller('task')
@UseGuards(AuthGuard)
// @Serialize(TaskDto)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() body: CreateTaskDto, @CurrentUser() user: Users) {
    return this.taskService.create(body, user);
  }

  @Get('/:id')
  findTask(@Param('id') id: string, @CurrentUser() user: Users) {
    // const tasks = this.taskService.findOne(parseInt(id))

    const tasks = this.taskService.findId(parseInt(id))
    const transformedData = plainToClass(TaskDto, tasks);
    return transformedData;
  }

  // get all
  @Get()
  async find(@Query() query: GetTaskDto): Promise<{ data: TaskDto[]; meta: PaginationMeta }> {
    const {data, meta} = await this.taskService.getTask(query)

    // Transformasi data menggunakan class-transformer
    const transformedData = plainToClass(TaskDto, data);

    return { data: transformedData, meta };
  }

  // 
  @Put('/:id')
  async changeStatus(@Param('id') id: string, @Body() body: any) {
    console.log(body.status);
    
    return this.taskService.changeStatus(parseInt(id), body.status)
  }
}

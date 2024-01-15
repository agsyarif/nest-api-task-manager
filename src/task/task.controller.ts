import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';
import { Users } from 'src/user/User';
import { AuthGuard } from 'src/guards/auth-guard';
import { TaskDto } from './dtos/task.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { query } from 'express';
import { GetTaskDto } from './dtos/get-task.dto';

@Controller('task')
@UseGuards(AuthGuard)
@Serialize(TaskDto)
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

    return tasks;
  }

  // get all
  @Get()
  async find(@Query() query: GetTaskDto) {
    return this.taskService.getTask(query)
  }

  // update

  // remove
}

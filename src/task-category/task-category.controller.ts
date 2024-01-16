import { Body, Controller, Post } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';

@Controller('task-category')
export class TaskCategoryController {
  constructor(private readonly taskcategoryService: TaskCategoryService) {}

  @Post()
  createCategory(@Body() body: any) {
    return this.taskcategoryService.create(body.title)
  }
}

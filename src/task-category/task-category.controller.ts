import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { PaginationLinks, PaginationMeta, PaginationUtil } from 'src/utils/pagination-util';
import { taskCategoryDto } from './task-category.dto';

@Controller('task-category')
export class TaskCategoryController {
  constructor(
    private readonly taskcategoryService: TaskCategoryService,
    private readonly paginationUtil: PaginationUtil,
  ) {}

  @Post()
  createCategory(@Body() body: any) {
    return this.taskcategoryService.create(body.title)
  }

  @Get("/cache-service")
  async cacheInService(): Promise<{data: taskCategoryDto, meta: PaginationMeta, links: PaginationLinks}> {
    const { data, itemCount } = await this.taskcategoryService.cacheInService();

    const { meta, links } = this.paginationUtil.generatePagination(
      itemCount,
      10, // pageSize
      1, // page
      "http://localhost:3000/task-category/cache-service"
    );

    return { data, meta, links }

  }

  // cache di controller
  // use Cache interceptor
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10) // konfigurasi TTl. jika belum di setting register
  @CacheKey("task-category/controller")
  @Get("/cache-controller")
  cacheInController() {

    console.log("getting data from db");

    return this.taskcategoryService.cacheInController();
  }
}

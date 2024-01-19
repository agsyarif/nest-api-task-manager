import { Module } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryController } from './task-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskCategoryEntity } from './task-category.entity';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { PaginationUtil } from 'src/utils/pagination-util';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskCategoryEntity]),
    JwtModule.register({secret: 'rahasiabanget'}),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: 6380
    })
  ],
  providers: [TaskCategoryService, PaginationUtil],
  controllers: [TaskCategoryController],
  exports: [TaskCategoryService]
})
export class TaskCategoryModule {}

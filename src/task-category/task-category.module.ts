import { Module } from '@nestjs/common';
import { TaskCategoryService } from './task-category.service';
import { TaskCategoryController } from './task-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskCategoryEntity } from './task-category.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskCategoryEntity]),
    JwtModule.register({secret: 'rahasiabanget'}),
  ],
  providers: [TaskCategoryService],
  controllers: [TaskCategoryController],
  exports: [TaskCategoryService]
})
export class TaskCategoryModule {}

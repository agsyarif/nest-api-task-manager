import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskCategoryEntity } from './task-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskCategoryService {
  constructor(@InjectRepository(TaskCategoryEntity) private repo: Repository<TaskCategoryEntity>) {}

  async create(title: string) {
    // const taskCategory = this.repo.create({ title });
    // return this.repo.save(taskCategory);
    
    try {
      const taskCategory = this.repo.create({ title });
      return await this.repo.save(taskCategory);
    } catch (error) {
      // Handle the error, log it, and possibly return a specific error response
      console.error('Error while creating task category:', error.message);
      throw new Error('Failed to create task category');
    }
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: {
        id: id
      }
    });
  }
}


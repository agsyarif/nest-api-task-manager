import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskCategoryEntity } from './task-category.entity';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TaskCategoryService {
  constructor(
    @InjectRepository(TaskCategoryEntity) private repo: Repository<TaskCategoryEntity>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

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


  // Cache di inject ke service
  // ==> Inject Cache di constructor
  // ==> set and get cache
  async cacheInService() {

    // var [ data, itemCount]
    // const cacheData = await this.cacheManager.get<{
    //   data: any
    // }>("task-category-pagination");

    const cachedData = await this.cacheManager.get<{ data: any; itemCount: number }>("task-category-pagination");

    if (cachedData) {
      console.log(`Getting data from cache!`);
      // const { data, itemCount } = cachedData;
      return cachedData;
    }

    const [ data, itemCount ] = await this.repo.findAndCount();

    const cache = await this.cacheManager.set("task-category-pagination", {data, itemCount}) // 10 = tts

    return { data, itemCount};
  }

  async cacheInController() {
    const tackCategory = await this.repo.findAndCount();

    console.log("service cache in controller");    

    return tackCategory
  }
}


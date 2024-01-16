import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './Tasks';
import { Like, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Users } from 'src/user/User';
import { GetTaskDto } from './dtos/get-task.dto';
import { PaginationMeta } from './dtos/pagination-meta.dto';
import { TaskCategoryEntity } from 'src/task-category/task-category.entity';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Tasks) private repo: Repository<Tasks>) {}


  create(body: CreateTaskDto, user: Users, taskCategory: TaskCategoryEntity) {    
    if (!user || !user.id) {
      throw new BadRequestException('User is required with a valid ID');
    }

    // const task = this.repo.create({ ...body, user: user });
    const task = this.repo.create(body);
    task.user = user
    task.taskCategory = taskCategory
    
    return this.repo.save(task);
  }

  findOne(id: number) {
    if(!id) {
      return null;
    }

    const user = this.repo.findOne({
      where: {
        id: id
      }
    })

    console.log(user);
    return user;
    
  }

  async findId(id: number) {
    const task = await this.repo
      .createQueryBuilder()
      .leftJoinAndSelect('Tasks.user', 'Users')
      .where('Tasks.id = :id', { id })
      .getOne()

      // Tasks => nama class entity yang digunakan bukan nama table
      
    return task;
  }

  async getTask({q, status, deadline, sort_dir, sort_field, page = 1, pageSize = 10}: GetTaskDto): Promise<{ data: Tasks[]; meta: PaginationMeta }> {

    const sortDir = sort_dir ?? "DESC";
    const sortField = sort_field ?? "created_at";
  
    const skip = (page - 1) * pageSize;

    const queryBuilder = this.repo
      .createQueryBuilder('Tasks')
      .leftJoinAndSelect('Tasks.user', 'Users')
      .leftJoinAndSelect('Tasks.taskCategory', 'TaskCategoryEntity')

      if(q) {
        queryBuilder
          .where('Tasks.title LIKE :q', { q: `%${q}%` })
          .orWhere('Tasks.description LIKE :q', { q: `%${q}%` });
      }

      if(status) {
        queryBuilder.andWhere('Tasks.status = :status', { status });
      }

      if(deadline) {
        queryBuilder.andWhere('Tasks.deadline = :deadline', { deadline });
      }

    const [data, itemCount] = await queryBuilder
      .skip(skip)
      .take(pageSize)
      .orderBy("Tasks." + sortField, sortDir)
      .getManyAndCount();
      
    const pageCount = Math.ceil(itemCount / pageSize);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < pageCount;

    const meta: PaginationMeta = {
      page,
      pageSize,
      itemCount,
      pageCount,
      hasPreviousPage,
      hasNextPage,
    };

    console.log(meta);
    
    return { data, meta };
  }

  async changeStatus(id: number, status: string) {
    const task = await this.findId(id);
    if(!task) {
      throw new NotFoundException('Task not found');
    }

    task.status = status
    return this.repo.save(task)
  }
}

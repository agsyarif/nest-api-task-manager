import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './Tasks';
import { Like, Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Users } from 'src/user/User';
import { GetTaskDto } from './dtos/get-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Tasks) private repo: Repository<Tasks>) {}


  create(body: CreateTaskDto, user: Users) {    
    if (!user || !user.id) {
      throw new BadRequestException('User is required with a valid ID');
    }

    // const task = this.repo.create({ ...body, user: user });
    const task = this.repo.create(body);
    task.user = user
    
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

  async getTask({q, status, deadline, sort_dir, sort_field}: GetTaskDto) {
    // console.log(q);
    
    // const tasks = await this.repo
    //   .createQueryBuilder()
    //   .leftJoinAndSelect('Tasks.user', 'Users')
    //   .where('Tasks.title LIKE :q', { q: `%${q}%` })
    //   .getMany()

    console.log('====');

    const sortDir = sort_dir ?? "DESC";
    const sortField = sort_field ?? "created_at";

    console.log("user." + sortField);
    console.log(sortDir);
    

    const queryBuilder = this.repo
      .createQueryBuilder('Tasks')
      .leftJoinAndSelect('Tasks.user', 'Users');

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
    
    const tasks = await queryBuilder
      .orderBy("Tasks." + sortField, sortDir)
      .getMany();
    
    return tasks;
  }
}

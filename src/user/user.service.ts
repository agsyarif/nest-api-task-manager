import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(Users) private repo: Repository<Users>) {}

  create(name: string, email: string, password: string) {
    const user = this.repo.create({name, email, password});
    return this.repo.save(user);
  }

  findOne(id: number) {
    if(!id) {
      return null;
    }
    
    return this.repo.findOne({
      where: {
        id: id
      }
    })
  }

  find(email: string) {
    if(!email) {
      return null
    }

    return this.repo.find({
      where: {
        email: email
      }
    })
  }

  async update(id: number, attr: Partial<Users>) {
    const user = await this.findOne(id);
    if(!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attr)
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if(!user) {
      throw new NotFoundException('User not found');
    }

    return this.repo.remove(user);
  }
}

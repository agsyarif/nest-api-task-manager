import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { scrypt as _scrypt, randomBytes } from "crypto";
import { promisify } from 'util';
import { info } from 'console';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signup(name: string, email: string, password: string) {
    const users = await this.userService.find(email);
    if(users.length) {
      throw new BadRequestException('Email in use')
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32) as Buffer);
    const result = salt + '.' + hash.toString('hex');
    const user = await this.userService.create(name, email, result)

    const token = this.jwtService.sign({user})
    user['token'] = token;
    return user;
  }

  async signin(email: string, password: string) {
    
    const [ user ] = await this.userService.find(email);
    if(!user) {
      throw new NotFoundException('user not found');
    }

    const [ salt, storedHash ] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32) as Buffer);

    if(storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad request');
    }

    // const token = this.jwtService.sign({id: user.id})
    const token = this.jwtService.sign({user})
    user['token'] = token;
    return user;
  }
}

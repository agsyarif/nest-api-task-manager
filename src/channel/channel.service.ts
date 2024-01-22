import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelEntity } from './channel.entity';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dtos/create-channel.dto';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelEntity) private readonly repo: Repository<ChannelEntity>,
    private readonly httpService: HttpService
  ) {}

  // create channel
  create(body: CreateChannelDto) {
    const channel = this.repo.create(body);
    return this.repo.save(channel);
  }
  
  // findOne channel
  findOne(id: number) {
    if(!id) {
      return null;
    }

    const channel = this.repo.findOne({
      where: {
        channelId: id
      }
    })

    return channel;
  }


  // LINKQU
  getListChannel(): Observable<AxiosResponse<any>> {

    // findAll(): Observable<AxiosResponse<Cat[]>> {
    //   return this.httpService.get('http://localhost:3000/cats');
    // }

    // var request = require('request');
    // var options = {
    //   'method': 'GET',
    //   'url': '/linkqu-partner/masterbank/list',
    //   'headers': {
    //     'client-id': 'testing',
    //     'client-secret': '123'
    //   }
    // };

    return this.httpService.get("https://gateway-dev.linkqu.id/linkqu-partner/masterbank/list", {
      headers: {
        "client_id": "testing",
        "client-secret": "123"
      }
    })

    // request(options, function (error, response) {
    //   if (error) throw new Error(error);
    //   console.log(response.body);
    // });

    // return ;
  }
    
  
}

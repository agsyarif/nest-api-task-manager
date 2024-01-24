import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelEntity } from './channel.entity';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dtos/create-channel.dto';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import * as http from 'http';

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
  getListChannel() {

    return this.httpService.get("https://gateway-dev.linkqu.id/linkqu-partner/masterbank/list", {
      headers: {
        "client_id": "testing",
        "client-secret": "123"
      }
    })
    // .pipe(
    //   map((response: AxiosResponse) => {
    //     return response.data;
    //   })
    // )

    // return this.httpService.get("https://gateway-dev.linkqu.id/linkqu-partner/masterbank/list", {
    //   headers: {
    //     "client_id": "testing",
    //     "client_secret": "123"  // Corrected to "client_secret"
    //   }
    // })
    //   .toPromise()  // Assuming you want to convert the observable to a promise
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error('Error:', error.message);
    //   });

    // return this.httpService.get("https://gateway-dev.linkqu.id/linkqu-partner/masterbank/list", {
    //   headers: {
    //     "client_id": "testing",
    //     "client_secret": "123"
    //   }
    // });
    
  }
    
  
}

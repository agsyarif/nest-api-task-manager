import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMethodEntity } from './channel-method.entity';
import { Repository } from 'typeorm';
import { CreateChannelMethodDto } from './dtos/create-channel-method.dto';
import { ChannelService } from 'src/channel/channel.service';
import { HttpService } from '@nestjs/axios';
import { Observable, map } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ChannelMethodService {
  constructor(
    @InjectRepository(ChannelMethodEntity) private readonly repo: Repository<ChannelMethodEntity>,
    private readonly channelService: ChannelService,
    private readonly httpService: HttpService
  ) {}

  async create(body: CreateChannelMethodDto) {
    const channel = await this.channelService.findOne(body.channelId);
    if(!channel) {
      throw new NotFoundException("channel not found")
    }

    console.log(body);
    

    const channelMethod = this.repo.create(body);
    channelMethod.channel = channel
    console.log(channelMethod);
    console.log("=========");
    

    return this.repo.save(channelMethod);
  }

  getBank(): Observable<AxiosResponse<any[]>> {
    // findAll() {
    
      const url = 'https://gateway-dev.linkqu.id/linkqu-partner/masterbank/list';
      const headers = {
        'client-id': 'testing',
        'client-secret': 123,
      };

      return this.httpService.get(url, { headers }).pipe(
        map((response: AxiosResponse) => {
          // Ambil bagian tertentu dari respons atau sesuaikan sesuai kebutuhan Anda
          return response.data;
        }),
      );

  }

  getEmoney() {
    const url = 'https://gateway-dev.linkqu.id/linkqu-partner/data/emoney?username=LI307GXIN'
    const headers = {
      'client-id': 'testing',
      'client-secret': 123,
    }

    return this.httpService.get(url, { headers }).pipe(
      map((response: AxiosResponse) => {
        // Ambil bagian tertentu dari respons atau sesuaikan sesuai kebutuhan Anda
        return response.data;
      }),
    );
  }

  index() {

  }   

  findOne() {

  }
}

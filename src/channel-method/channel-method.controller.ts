import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChannelMethodService } from './channel-method.service';
import { CreateChannelMethodDto } from './dtos/create-channel-method.dto';

@Controller('channel-method')
export class ChannelMethodController {
  constructor(private readonly channelMethodService: ChannelMethodService) {}

  @Post()
  createChannelMethod(@Body() body: CreateChannelMethodDto) {
    return this.channelMethodService.create(body);
  }

  @Get('bank')
  findAll() {
    return this.channelMethodService.getBank();
  }

  @Get('emoney')
  getEmoney() {
    return this.channelMethodService.getEmoney();
  }
}

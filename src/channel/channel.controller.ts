import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dtos/create-channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  createChannel(@Body() body: CreateChannelDto) {
    return this.channelService.create(body);
  }

  @Get("/:id")
  async findChannel(@Param('id') id: string) {
    const channel = await this.channelService.findOne(parseInt(id));
    console.log(channel);
    
    return channel
  }

  @Get('linkqu/chanel')
  getListChannel() {

    return this.channelService.getListChannel();

    // this.channelService.getListChannel().subscribe (
    //   response => {
    //     console.log(response.data);
    //   },
    //   error => {
    //     console.error('Error:', error.message);
    //   }
    // );

    // var request = require('request');
    // var options = {
    //   'method': 'GET',
    //   'url': '/linkqu-partner/masterbank/list',
    //   'headers': {
    //     'client-id': 'testing',
    //     'client-secret': '123'
    //   }
    // };
    // request(options, function (error, response) {
    //   if (error) throw new Error(error);
    //   console.log(response.body);
    // });
  }
  
}

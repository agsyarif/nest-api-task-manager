import { Module } from '@nestjs/common';
import { ChannelMethodService } from './channel-method.service';
import { ChannelMethodController } from './channel-method.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelMethodEntity } from './channel-method.entity';
import { ChannelModule } from 'src/channel/channel.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChannelMethodEntity]),
    ChannelModule,
    HttpModule
  ],
  providers: [ChannelMethodService],
  controllers: [ChannelMethodController],
  exports: [ChannelMethodService]
})
export class ChannelMethodModule {}

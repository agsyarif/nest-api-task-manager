import { Module } from '@nestjs/common';
import { SignatureService } from './signature.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ChannelMethodModule } from 'src/channel-method/channel-method.module';

@Module({
  imports: [HttpModule.register({}), ChannelMethodModule],
  providers: [SignatureService]
})
export class SignatureModule {}

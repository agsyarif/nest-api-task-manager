import { Module } from '@nestjs/common';
import { ReceiveFundsService } from './receive-funds.service';
import { VirtualAccountService } from './virtual-account/virtual-account.service';
import { VirtualAccountController } from './virtual-account/virtual-account.controller';
import { HttpModule } from '@nestjs/axios';
import { SignatureService } from '../signature/signature.service';
import { ChannelMethodModule } from 'src/channel-method/channel-method.module';

@Module({
  imports: [
    HttpModule.register({}),
  ],
  providers: [ReceiveFundsService, VirtualAccountService, SignatureService],
  controllers: [VirtualAccountController]
})
export class ReceiveFundsModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { ChannelMethodService } from './channel-method.service';

describe('ChannelMethodService', () => {
  let service: ChannelMethodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelMethodService],
    }).compile();

    service = module.get<ChannelMethodService>(ChannelMethodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

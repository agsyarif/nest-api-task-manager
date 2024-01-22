import { Test, TestingModule } from '@nestjs/testing';
import { ChannelMethodController } from './channel-method.controller';

describe('ChannelMethodController', () => {
  let controller: ChannelMethodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelMethodController],
    }).compile();

    controller = module.get<ChannelMethodController>(ChannelMethodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

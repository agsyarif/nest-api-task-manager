import { Test, TestingModule } from '@nestjs/testing';
import { ReceiveFundsController } from './receive-funds.controller';

describe('ReceiveFundsController', () => {
  let controller: ReceiveFundsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReceiveFundsController],
    }).compile();

    controller = module.get<ReceiveFundsController>(ReceiveFundsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

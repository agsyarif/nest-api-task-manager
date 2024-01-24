import { Test, TestingModule } from '@nestjs/testing';
import { ReceiveFundsService } from './receive-funds.service';

describe('ReceiveFundsService', () => {
  let service: ReceiveFundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceiveFundsService],
    }).compile();

    service = module.get<ReceiveFundsService>(ReceiveFundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

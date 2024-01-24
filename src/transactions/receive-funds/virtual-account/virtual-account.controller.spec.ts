import { Test, TestingModule } from '@nestjs/testing';
import { VirtualAccountController } from './virtual-account.controller';

describe('VirtualAccountController', () => {
  let controller: VirtualAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VirtualAccountController],
    }).compile();

    controller = module.get<VirtualAccountController>(VirtualAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

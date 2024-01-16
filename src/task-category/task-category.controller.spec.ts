import { Test, TestingModule } from '@nestjs/testing';
import { TaskCategoryController } from './task-category.controller';

describe('TaskCategoryController', () => {
  let controller: TaskCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskCategoryController],
    }).compile();

    controller = module.get<TaskCategoryController>(TaskCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

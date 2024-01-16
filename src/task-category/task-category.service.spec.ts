import { Test, TestingModule } from '@nestjs/testing';
import { TaskCategoryService } from './task-category.service';

describe('TaskCategoryService', () => {
  let service: TaskCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskCategoryService],
    }).compile();

    service = module.get<TaskCategoryService>(TaskCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

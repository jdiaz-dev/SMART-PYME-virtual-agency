import { Test, TestingModule } from '@nestjs/testing';
import { FeeQueriesController } from './fee-queries.controller';

describe('FeeQueriesController', () => {
  let controller: FeeQueriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeeQueriesController],
    }).compile();

    controller = module.get<FeeQueriesController>(FeeQueriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

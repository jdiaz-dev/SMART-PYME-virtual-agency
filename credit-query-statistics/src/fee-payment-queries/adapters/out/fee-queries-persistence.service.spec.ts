import { Test, TestingModule } from '@nestjs/testing';
import { FeeQueriesPersistenceService } from './fee-queries-persistence.service';

describe('FeeQueriesPersistenceService', () => {
  let service: FeeQueriesPersistenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeeQueriesPersistenceService],
    }).compile();

    service = module.get<FeeQueriesPersistenceService>(FeeQueriesPersistenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

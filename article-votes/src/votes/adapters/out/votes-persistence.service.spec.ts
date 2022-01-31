import { Test, TestingModule } from '@nestjs/testing';
import { VotesPersistenceService } from './votes-persistence.service';

describe('VotesPersistenceService', () => {
  let service: VotesPersistenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotesPersistenceService],
    }).compile();

    service = module.get<VotesPersistenceService>(VotesPersistenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

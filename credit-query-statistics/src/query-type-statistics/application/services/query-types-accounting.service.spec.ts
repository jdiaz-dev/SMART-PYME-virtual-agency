import { Test, TestingModule } from '@nestjs/testing';
import { QueryTypesAccountingService } from './query-types-accounting.service';

describe('QueryTypesAccountingService', () => {
  let service: QueryTypesAccountingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryTypesAccountingService],
    }).compile();

    service = module.get<QueryTypesAccountingService>(QueryTypesAccountingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

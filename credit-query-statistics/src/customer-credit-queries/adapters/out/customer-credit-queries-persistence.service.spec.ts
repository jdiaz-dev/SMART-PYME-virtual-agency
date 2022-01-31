import { Test, TestingModule } from '@nestjs/testing';
import { CustomerCreditQueriesPersistenceService } from './customer-credit-queries-persistence.service';

describe('CustomerCreditQueriesPersistenceService', () => {
  let service: CustomerCreditQueriesPersistenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerCreditQueriesPersistenceService],
    }).compile();

    service = module.get<CustomerCreditQueriesPersistenceService>(CustomerCreditQueriesPersistenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

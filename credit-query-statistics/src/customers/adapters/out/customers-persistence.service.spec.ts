import { Test, TestingModule } from '@nestjs/testing';
import { CustomersPersistenceService } from './customers-persistence.service';

describe('CustomersPersistenceService', () => {
  let service: CustomersPersistenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersPersistenceService],
    }).compile();

    service = module.get<CustomersPersistenceService>(CustomersPersistenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

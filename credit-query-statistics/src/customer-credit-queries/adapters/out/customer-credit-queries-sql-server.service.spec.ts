import { Test, TestingModule } from '@nestjs/testing';
import { CustomerCreditQueriesSqlServerService } from './customer-credit-queries-sql-server.service';

describe('CustomerCreditQueriesSqlServerService', () => {
  let service: CustomerCreditQueriesSqlServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerCreditQueriesSqlServerService],
    }).compile();

    service = module.get<CustomerCreditQueriesSqlServerService>(CustomerCreditQueriesSqlServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

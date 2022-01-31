import { Test, TestingModule } from '@nestjs/testing';
import { CustomersSqlServerService } from './customers-sql-server.service';

describe('CustomersSqlServerService', () => {
  let service: CustomersSqlServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersSqlServerService],
    }).compile();

    service = module.get<CustomersSqlServerService>(CustomersSqlServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

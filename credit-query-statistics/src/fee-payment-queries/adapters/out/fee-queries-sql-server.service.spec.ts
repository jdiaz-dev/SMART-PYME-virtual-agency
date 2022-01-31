import { Test, TestingModule } from '@nestjs/testing';
import { FeeQueriesSqlServerService } from './fee-queries-sql-server.service';

describe('FeeQueriesSqlServerService', () => {
  let service: FeeQueriesSqlServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeeQueriesSqlServerService],
    }).compile();

    service = module.get<FeeQueriesSqlServerService>(FeeQueriesSqlServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

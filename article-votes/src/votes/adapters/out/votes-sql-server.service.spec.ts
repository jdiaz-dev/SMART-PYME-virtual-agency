import { Test, TestingModule } from '@nestjs/testing';
import { VotesSqlServerService } from './votes-sql-server.service';

describe('VotesSqlServerService', () => {
  let service: VotesSqlServerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotesSqlServerService],
    }).compile();

    service = module.get<VotesSqlServerService>(VotesSqlServerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

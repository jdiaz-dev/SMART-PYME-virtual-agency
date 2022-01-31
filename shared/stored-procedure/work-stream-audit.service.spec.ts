import { Test, TestingModule } from '@nestjs/testing';
import { WorkStreamAuditService } from './work-stream-audit.service';

describe('WorkStreamAuditService', () => {
  let service: WorkStreamAuditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkStreamAuditService],
    }).compile();

    service = module.get<WorkStreamAuditService>(WorkStreamAuditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

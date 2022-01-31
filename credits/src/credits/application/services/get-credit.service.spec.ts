import { Test, TestingModule } from '@nestjs/testing';
import { GetCreditService } from './get-credit.service';

describe('GetCreditService', () => {
  let service: GetCreditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCreditService],
    }).compile();

    service = module.get<GetCreditService>(GetCreditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CreditPaymentFeesPersistenceService } from './credit-payment-fees-persistence.service';

describe('CreditPaymentFeesPersistenceService', () => {
  let service: CreditPaymentFeesPersistenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditPaymentFeesPersistenceService],
    }).compile();

    service = module.get<CreditPaymentFeesPersistenceService>(CreditPaymentFeesPersistenceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CreditPaymentFeesController } from './credit-payment-fees.controller';

describe('CreditPaymentFeesController', () => {
  let controller: CreditPaymentFeesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreditPaymentFeesController],
    }).compile();

    controller = module.get<CreditPaymentFeesController>(CreditPaymentFeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

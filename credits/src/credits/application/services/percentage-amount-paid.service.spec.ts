import { Test, TestingModule } from '@nestjs/testing';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { PercentageAmountPaidService } from './percentage-amount-paid.service';
import { CreditsPersistenceService } from './../../adapters/out/credits/credits-persistence.service';
import { FeesPersistenceService } from './../../adapters/out/credit-payment-fees/fees-persistence.service';

describe('PercentageAmountPaidService', () => {
    let percentageAmountPaidService: PercentageAmountPaidService,
        creditsPersistenceService: CreditsPersistenceService,
        feesPersistenceService: FeesPersistenceService;

    beforeAll(async () => {
        const creditsPersistenceServiceProvider = {
            provide: CreditsPersistenceService,
            useFactory: () => ({
                getCredits: jest.fn(),
            }),
        };

        const feesPersistenceServiceProvider = {
            provide: FeesPersistenceService,
            useFactory: () => ({
                getStatusFees: jest.fn(),
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PercentageAmountPaidService,
                CreditsPersistenceService,
                FeesPersistenceService,

                creditsPersistenceServiceProvider,
                feesPersistenceServiceProvider,
            ],
        }).compile();

        percentageAmountPaidService = module.get<PercentageAmountPaidService>(PercentageAmountPaidService);
        creditsPersistenceService = module.get<CreditsPersistenceService>(CreditsPersistenceService);
        feesPersistenceService = module.get<FeesPersistenceService>(FeesPersistenceService);
    });

    it('should be defined', () => {
        expect(percentageAmountPaidService).toBeDefined();
    });

    it('calculatePercentageByCredit method should call dependencies', () => {
        const getCreditsSpy = jest.spyOn(creditsPersistenceService, 'getCredits');
        const getStatusFeesSpy = jest.spyOn(feesPersistenceService, 'getStatusFees');
        const customerId = '',
            creditId = '',
            queries: ISetQueries = { orderBy: '', size: 0, offset: 0, search: '' };
        percentageAmountPaidService.calculatePercentageByCredit(customerId, queries);

        expect(getCreditsSpy).toHaveBeenCalledWith(customerId, queries);
        expect(getStatusFeesSpy).toHaveBeenCalledWith(customerId, creditId);
    });
});

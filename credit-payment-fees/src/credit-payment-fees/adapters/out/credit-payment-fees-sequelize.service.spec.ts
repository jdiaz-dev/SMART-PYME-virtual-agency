import { Test, TestingModule } from '@nestjs/testing';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { CreditPaymentFeesSqlServerService } from './credit-payment-fees-sql-server.service';

class CreditPaymentFeesSequelizeServiceMock {
    getCreditPaymentFees(customerId: string, creditId: string, queries: ISetQueries) {}
}
describe('CreditPaymentFeesSqlServerService', () => {
    let feesSqlServerService: CreditPaymentFeesSqlServerService;
    const customerId = '',
        creditId = '',
        queries: ISetQueries = { orderBy: '', size: 0, offset: 0, search: '' };

    beforeAll(async () => {
        const sqlServerServiceProvider = {
            provide: CreditPaymentFeesSqlServerService,
            useClass: CreditPaymentFeesSequelizeServiceMock,
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [CreditPaymentFeesSqlServerService, sqlServerServiceProvider],
        }).compile();

        feesSqlServerService = module.get<CreditPaymentFeesSqlServerService>(CreditPaymentFeesSqlServerService);
    });

    it('should be defined', () => {
        expect(feesSqlServerService).toBeDefined();
    });

    it('should call getCreditPaymentFees method with expected params', () => {
        const getCreditPaymentFeesSpy = jest.spyOn(feesSqlServerService, 'getCreditPaymentFees');
        //feesSqlServerService.getCreditPaymentFees(, creditId);
        //expect(getCreditPaymentFeesSpy).toHaveBeenCalledWith(customerId, creditId, queries);
    });
});

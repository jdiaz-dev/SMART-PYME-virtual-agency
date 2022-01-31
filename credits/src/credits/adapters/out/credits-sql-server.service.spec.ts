import { Test, TestingModule } from '@nestjs/testing';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { CreditsSqlServerService } from './credits/credits-sql-server.service';

class CreditsSqlServerServiceMock {
    getCredit(customerId: string, creditId: string) {}
    getCredits(customerId: string, queries: ISetQueries) {}
}
describe('CreditsSqlServerService', () => {
    let creditSqlServerService: CreditsSqlServerService;
    const customerId = '',
        creditId = '',
        queries: ISetQueries = { orderBy: '', size: 0, offset: 0, search: '' };

    beforeAll(async () => {
        const sqlServerServiceProvider = {
            provide: CreditsSqlServerService,
            useClass: CreditsSqlServerServiceMock,
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [CreditsSqlServerService, sqlServerServiceProvider],
        }).compile();

        creditSqlServerService = module.get<CreditsSqlServerService>(CreditsSqlServerService);
    });

    it('should be defined', () => {
        expect(creditSqlServerService).toBeDefined();
    });

    it('should call getCredit method with expected params', () => {
        const getCreditSpy = jest.spyOn(creditSqlServerService, 'getCredit');
        creditSqlServerService.getCredit(customerId, creditId);
        expect(getCreditSpy).toHaveBeenCalledWith(customerId, creditId);
    });

    it('should call getCredits method with expected params', () => {
        const getCreditsSpy = jest.spyOn(creditSqlServerService, 'getCredits');
        creditSqlServerService.getCredits(customerId, queries);
        expect(getCreditsSpy).toHaveBeenCalledWith(customerId, queries);
    });
});

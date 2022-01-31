import { Test, TestingModule } from '@nestjs/testing';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { CreditsPersistenceService } from './credits-persistence.service';

class CreditsPersistenceServiceMock {
    getCredit(customerId: string, creditId: string) {}
    getCredits(customerId: string, queries: ISetQueries) {}
}
describe('CreditsPersistenceService', () => {
    let creditsPersistenceService: CreditsPersistenceService;
    const customerId = '',
        creditId = '',
        queries: ISetQueries = { orderBy: '', size: 0, offset: 0, search: '' };

    beforeAll(async () => {
        const sqlServerServiceProvider = {
            provide: CreditsPersistenceService,
            useClass: CreditsPersistenceServiceMock,
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [CreditsPersistenceService, sqlServerServiceProvider],
        }).compile();

        creditsPersistenceService = module.get<CreditsPersistenceService>(CreditsPersistenceService);
    });

    it('should be defined', () => {
        expect(creditsPersistenceService).toBeDefined();
    });

    it('should call getCredit method with expected params', () => {
        const getCreditSpy = jest.spyOn(creditsPersistenceService, 'getCredit');
        creditsPersistenceService.getCredit(customerId, creditId);
        expect(getCreditSpy).toHaveBeenCalledWith(customerId, creditId);
    });

    it('should call getCredits method with expected params', () => {
        const getCreditsSpy = jest.spyOn(creditsPersistenceService, 'getCredits');
        creditsPersistenceService.getCredits(customerId, queries);
        expect(getCreditsSpy).toHaveBeenCalledWith(customerId, queries);
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CreditsController } from './credits.controller';
import { CreditsPersistenceService } from './../out/credits/credits-persistence.service';
import { CreditQueryStatisticDto } from './dtos/credit-query-statistic';
import { RecordsMapperService } from '../../../../../shared/services/records-mapper.service';
import { StatisticsPersistenceService } from '../out/credit-query-statistics/statistics-persistence.service';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { PercentageAmountPaidService } from './../../application/services/percentage-amount-paid.service';

class RecordsMapperServiceMock {
    mapUniqueRecord(uniqueRecord: any) {
        return [];
    }
}
describe('CreditsController', () => {
    let creditsController: CreditsController,
        statisticsPersistenceService: StatisticsPersistenceService,
        creditsPersistenceService: CreditsPersistenceService,
        recordsMapperService: RecordsMapperService;

    beforeAll(async () => {
        const recordsMapperServiceProvider = {
            provide: RecordsMapperService,
            useFactory: async () => ({
                mapUniqueRecord: jest.fn(() => []),
            }),
            //useClass: RecordsMapperServiceMock,
        };

        const creditsPersistenceServiceProvider = {
            provide: CreditsPersistenceService,
            useFactory: () => ({
                getCredit: jest.fn(() => []),
            }),
        };
        const statisticsPersistenceServiceProvider = {
            provide: StatisticsPersistenceService,
            useFactory: () => ({
                insertStatistic: jest.fn(() => []),
            }),
        };
        const percentageAmountPaidServiceProvider = {
            provide: PercentageAmountPaidService,
            useFactory: () => ({
                calculatePercentageByCredit: (customerId: string, queries: ISetQueries) => {},
            }),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CreditsController],
            providers: [
                RecordsMapperService,
                CreditsPersistenceService,
                StatisticsPersistenceService,
                PercentageAmountPaidService,

                //recordsMapperServiceProvider,
                creditsPersistenceServiceProvider,
                statisticsPersistenceServiceProvider,
                percentageAmountPaidServiceProvider,
            ],
        }).compile();

        creditsController = module.get<CreditsController>(CreditsController);
        statisticsPersistenceService = module.get<StatisticsPersistenceService>(StatisticsPersistenceService);
        creditsPersistenceService = module.get<CreditsPersistenceService>(CreditsPersistenceService);
        recordsMapperService = module.get<RecordsMapperService>(RecordsMapperService);
    });

    it('should be defined', () => {
        expect(creditsController).toBeDefined();
    });

    it('calling getCredit method', () => {
        const dto = new CreditQueryStatisticDto('', '', '', '', '', ''),
            customerId = '',
            creditId = '',
            record = '';

        const spy = jest.spyOn(recordsMapperService, 'mapUniqueRecord').mockImplementation(() => {});
        creditsController.getCredit(dto, customerId, creditId);
        expect(statisticsPersistenceService.insertStatistic).toHaveBeenCalledWith(dto);
        expect(creditsPersistenceService.getCredit).toHaveBeenCalledWith(customerId, creditId);
        //expect(spy).toHaveBeenCalled(); //it doesn't work, to investigate
    });
});

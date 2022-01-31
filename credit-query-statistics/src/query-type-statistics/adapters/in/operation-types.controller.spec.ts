import { Test, TestingModule } from '@nestjs/testing';
import { QueryTypeStatisticsController } from './query-type-statistics.controller';

describe('QueryTypeStatisticsController', () => {
    let controller: QueryTypeStatisticsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QueryTypeStatisticsController],
        }).compile();

        controller = module.get<QueryTypeStatisticsController>(QueryTypeStatisticsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

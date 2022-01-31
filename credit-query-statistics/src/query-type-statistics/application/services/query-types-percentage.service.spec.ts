import { Test, TestingModule } from '@nestjs/testing';
import { QueryTypesPercentageService } from './query-types-percentage.service';

describe('QueryTypesPercentageService', () => {
    let service: QueryTypesPercentageService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QueryTypesPercentageService],
        }).compile();

        service = module.get<QueryTypesPercentageService>(QueryTypesPercentageService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

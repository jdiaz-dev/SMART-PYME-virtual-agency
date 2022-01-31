import { Test, TestingModule } from '@nestjs/testing';
import { QueryTypesPersistenceService } from './query-types-persistence.service';

describe('QueryTypesPersistenceService', () => {
    let service: QueryTypesPersistenceService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QueryTypesPersistenceService],
        }).compile();

        service = module.get<QueryTypesPersistenceService>(QueryTypesPersistenceService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

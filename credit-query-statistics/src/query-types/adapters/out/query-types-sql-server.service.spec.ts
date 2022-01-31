import { Test, TestingModule } from '@nestjs/testing';
import { QueryTypesSqlServerService } from './query-types-sql-server.service';

describe('QueryTypesSqlServerService', () => {
    let service: QueryTypesSqlServerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [QueryTypesSqlServerService],
        }).compile();

        service = module.get<QueryTypesSqlServerService>(QueryTypesSqlServerService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RecordsMapperService } from './records-mapper.service';

describe('RecordsMapperService', () => {
    let service: RecordsMapperService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RecordsMapperService],
        }).compile();

        service = module.get<RecordsMapperService>(RecordsMapperService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});

import { Test, TestingModule } from '@nestjs/testing';
import { QueryTypesController } from './query-types.controller';

describe('QueryTypesController', () => {
    let controller: QueryTypesController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [QueryTypesController],
        }).compile();

        controller = module.get<QueryTypesController>(QueryTypesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

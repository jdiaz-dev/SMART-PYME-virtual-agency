import { Test, TestingModule } from '@nestjs/testing';
import { CustomersPersistenceService } from './customers-persistence.service';
import { GetCustomerDto } from './../in/dtos/get-customer.dto';

class CustomerPersistenceServiceMock {
    getCustomer(getCustomerDto: GetCustomerDto) {
        return [];
    }
}

describe('CustomersPersistenceService', () => {
    let persistenceService: CustomersPersistenceService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: CustomersPersistenceService,
            useClass: CustomerPersistenceServiceMock,
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [ApiServiceProvider],
        }).compile();

        persistenceService = module.get<CustomersPersistenceService>(CustomersPersistenceService);
    });

    it('should be defined', () => {
        expect(persistenceService).toBeDefined();
    });
    it('should get customer', () => {
        const customerDto = { documentNumber: '', phone: '' };
        expect(persistenceService.getCustomer(customerDto)).toStrictEqual([]);
    });
});

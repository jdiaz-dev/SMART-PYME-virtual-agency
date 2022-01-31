import { Test, TestingModule } from '@nestjs/testing';
import { RecordsMapperService } from '../../../../../shared/services/records-mapper.service';
import { CustomersPersistenceService } from '../out/customers-persistence.service';
import { CustomersSqlServerService } from '../out/customers-sql-server.service';
import { CustomersController } from './customers.controller';
import { GetCustomerDto } from './dtos/get-customer.dto';

class CustomerSqlServerServiceMock {
    getCustomer(getCustomerDto: GetCustomerDto) {
        return [];
    }
}

describe('CustomersController', () => {
    let controller: CustomersController,
        mapperService: RecordsMapperService,
        persistenceService: CustomersPersistenceService;

    beforeAll(async () => {
        const sqlServerServiceProvider = {
            provide: CustomersSqlServerService,
            useClass: CustomerSqlServerServiceMock,
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CustomersController],
            providers: [RecordsMapperService, CustomersPersistenceService, sqlServerServiceProvider],
        }).compile();

        controller = module.get<CustomersController>(CustomersController);
        mapperService = module.get<RecordsMapperService>(RecordsMapperService);
        persistenceService = module.get<CustomersPersistenceService>(CustomersPersistenceService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should call getCustomer from persistence', () => {
        const spy1 = jest.spyOn(persistenceService, 'getCustomer').mockImplementation(() => null);
        const customerDto = { documentNumber: '', phone: '' };
        controller.getCustomer(customerDto);

        expect(spy1).toHaveBeenCalledWith(customerDto);
    });
});

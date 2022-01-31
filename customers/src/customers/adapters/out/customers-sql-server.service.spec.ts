import { Test, TestingModule } from '@nestjs/testing';
import { GetCustomerDto } from '../in/dtos/get-customer.dto';
import { CustomersSqlServerService } from './customers-sql-server.service';

class CustomerSqlServerServiceMock {
    getCustomer(getCustomerDto: GetCustomerDto) {
        return [];
    }
}

describe('CustomersSqlServerService', () => {
    let sqlServerService: CustomersSqlServerService;

    beforeAll(async () => {
        const sqlServerServiceProvider = {
            provide: CustomersSqlServerService,
            useClass: CustomerSqlServerServiceMock,
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [CustomersSqlServerService, sqlServerServiceProvider],
        }).compile();
        sqlServerService = module.get<CustomersSqlServerService>(CustomersSqlServerService);
    });

    it('should be defined', () => {
        expect(sqlServerService).toBeDefined();
    });

    it('should get customer', () => {
        const customerDto = { documentNumber: '', phone: '' };
        expect(sqlServerService.getCustomer(customerDto)).toStrictEqual([]);
    });
});

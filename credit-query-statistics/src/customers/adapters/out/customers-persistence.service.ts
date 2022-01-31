import { Injectable } from '@nestjs/common';
import { CustomersSqlServerService } from './customers-sql-server.service';
import { ICustomersRepository } from './customers.repository';
import { ICustomerAndCreditIds } from './interfaces/customer-and-credit-ids';
import { ICustomerId } from './interfaces/customer-id';

@Injectable()
export class CustomersPersistenceService {
    private customersRepository: ICustomersRepository;

    constructor(customersSqlServerService: CustomersSqlServerService) {
        this.customersRepository = customersSqlServerService;
    }
    getCustomerAndCreditIds(customerGUID: string, creditGUID: string): Promise<ICustomerAndCreditIds[]> {
        return this.customersRepository.getCustomerAndCreditIds(customerGUID, creditGUID);
    }
    getCustomerId(customerGUID: string): Promise<ICustomerId[]> {
        return this.customersRepository.getCustomerId(customerGUID);
    }
}

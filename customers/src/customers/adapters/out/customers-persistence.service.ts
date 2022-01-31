import { Injectable } from '@nestjs/common';
import { IGetCustomerRequest } from 'src/customers/application/in/get.customer.request';
import { GetCustomerDto } from '../in/dtos/get-customer.dto';
import { CustomersSqlServerService } from './customers-sql-server.service';
import { ISpGetDetailCustomer } from './sp-interfaces/sp-get-detail-customer';

@Injectable()
export class CustomersPersistenceService implements IGetCustomerRequest {
    constructor(private customersSqlServer: CustomersSqlServerService) {}

    async getCustomer(getCustomerDto: GetCustomerDto): Promise<ISpGetDetailCustomer[]> {
        return this.customersSqlServer.getCustomer(getCustomerDto);
    }
}

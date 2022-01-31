import { GetCustomerDto } from 'src/customers/adapters/in/dtos/get-customer.dto';
import { ISpGetDetailCustomer } from '../../adapters/out/sp-interfaces/sp-get-detail-customer';

export interface IGetCustomerRequest {
    getCustomer(getCustomerDto: GetCustomerDto): Promise<ISpGetDetailCustomer[]>;
}

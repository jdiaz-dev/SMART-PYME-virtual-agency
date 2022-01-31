import { GetCustomerDto } from '../in/dtos/get-customer.dto';
import { ISpGetDetailCustomer } from './sp-interfaces/sp-get-detail-customer';

export interface ICustomerRepository {
    getCustomer(getCustomerDto: GetCustomerDto): Promise<ISpGetDetailCustomer[]>;
    //getCustomers(): Promise<any>;
}

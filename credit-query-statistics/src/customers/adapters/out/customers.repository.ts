import { ICustomerAndCreditIds } from './interfaces/customer-and-credit-ids';
import { ICustomerId } from './interfaces/customer-id';

export interface ICustomersRepository {
    getCustomerAndCreditIds(customerGUID: string, creditGUID: string): Promise<ICustomerAndCreditIds[]>;
    getCustomerId(customerGUID: string): Promise<ICustomerId[]>;
}

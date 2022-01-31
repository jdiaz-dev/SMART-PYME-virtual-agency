import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { ICustomersRepository } from './customers.repository';
import { Sequelize, QueryTypes } from 'sequelize';
import { ICustomerAndCreditIds } from './interfaces/customer-and-credit-ids';
import { ICustomerId } from './interfaces/customer-id';

@Injectable()
export class CustomersSqlServerService implements ICustomersRepository {
    constructor(
        @InjectConnection(NameConnectionEnum.NAME_CONNECTION) private connection: Sequelize,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}
    async getCustomerAndCreditIds(customerGUID: string, creditGUID: string): Promise<ICustomerAndCreditIds[]> {
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetCustomerAndCreditIds] 
                @CustomerGUID = $customerGUID, 
                @CreditGUID = $creditGUID`;

            const ids: ICustomerAndCreditIds[] = await this.connection.query(query, {
                bind: {
                    customerGUID,
                    creditGUID,
                },
                type: QueryTypes.SELECT,
                raw: true,
            });

            if (ids[0]) {
                return ids;
            }
        } catch (error) {
            console.log('---------error', error);
            this.logger
                .child({
                    class: this.toString(),
                    method: this.getCustomerAndCreditIds.name,
                    customerGUID,
                    creditGUID,
                })
                .error(error);
        }
    }
    async getCustomerId(customerGUID: string): Promise<ICustomerId[]> {
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetCustomerId] 
                @CustomerGUID = $customerGUID`;

            const customerId: ICustomerId[] = await this.connection.query(query, {
                bind: {
                    customerGUID,
                },
                type: QueryTypes.SELECT,
                raw: true,
            });

            if (customerId[0]) {
                return customerId;
            }
        } catch (error) {
            console.log('---------error', error);
            this.logger
                .child({
                    class: this.toString(),
                    method: this.getCustomerId.name,
                    customerGUID,
                })
                .error(error);
        }
    }
    toString() {
        return CustomersSqlServerService.name;
    }
}

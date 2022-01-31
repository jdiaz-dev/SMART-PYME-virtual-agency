import { BadRequestException, HttpException, Inject, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Sequelize, QueryTypes } from 'sequelize';
import { GetCustomerDto } from '../in/dtos/get-customer.dto';
import { ErrorMesaggesEnum } from '../../../../../shared/enums/messages-failed-request';
import { ICustomerRepository } from './customers.repository';
import { ISpGetDetailCustomer } from './sp-interfaces/sp-get-detail-customer';

export class CustomersSequelizeServiceProvider implements ICustomerRepository {
    constructor(
        @InjectConnection(NameConnectionEnum.NAME_CONNECTION) private connection: Sequelize,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}
    async getCustomer(_customer: GetCustomerDto): Promise<ISpGetDetailCustomer[]> {
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetDetailCustomer] 
                @DocumentNum = $documentNumber, 
                @Phone = $phone`;

            const customer: ISpGetDetailCustomer[] = await this.connection.query(query, {
                bind: {
                    documentNumber: _customer.documentNumber,
                    phone: _customer.phone,
                },
                type: QueryTypes.SELECT,
                raw: true,
            });

            if (customer[0]) {
                return customer;
            } else {
                throw new BadRequestException(ErrorMesaggesEnum.CUSTOMER_NOT_FOUND);
            }
        } catch (error) {
            console.log('---------error', error);
            this.logger
                .child({ class: this.toString(), method: this.getCustomer.name, ..._customer })
                .error(error);

            if (error.response) {
                throw new BadRequestException(ErrorMesaggesEnum.CUSTOMER_NOT_FOUND);
            }
            throw new InternalServerErrorException();
        }
    }
    toString() {
        return CustomersSequelizeServiceProvider.name;
    }
}

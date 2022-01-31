import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { GetCustomerDto } from '../in/dtos/get-customer.dto';
import { ICustomerRepository } from './customers.repository';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class CustomersSqlServerService implements ICustomerRepository {
    constructor(
        @InjectConnection(NameConnectionEnum.NAME_CONNECTION) private connection: Sequelize,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async getCustomer(_customer: GetCustomerDto): Promise<any> {}
}

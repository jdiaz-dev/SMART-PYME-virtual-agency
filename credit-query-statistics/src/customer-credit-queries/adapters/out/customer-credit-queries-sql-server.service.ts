import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { SaveTypeQueryDto } from 'src/query-types/adapters/in/dtos/save-query-type-by-customer.dto';
import { Logger } from 'winston';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { ICustomerCreditQueriesRepository } from './customer-credit-queries.repository';
import { Sequelize, QueryTypes } from 'sequelize';
import { IOperationTypeByDateQueries } from '../../../shared/interfaces/operation-type-by-date-queries';
import { IRowsCounted } from 'src/shared/interfaces/stored-procedures/rows-counted';

@Injectable()
export class CustomerCreditQueriesSqlServerService implements ICustomerCreditQueriesRepository {
    constructor(
        @InjectConnection(NameConnectionEnum.NAME_CONNECTION) private connection: Sequelize,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}
    async saveCustomerCreditQuery(saveTypeQueryDto: SaveTypeQueryDto): Promise<any> {
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spInsertCustomerCreditQuery] 
                @CustomerId = $customerId, 
                @OperaringSystem = $operatingSystem,
                @Device = $device,
                @ModelDevice = $modelDevice,
                @RequestIp = $requestIp`;

            const customerCreditQuery = await this.connection.query(query, {
                bind: {
                    customerId: saveTypeQueryDto.customerId,
                    operatingSystem: saveTypeQueryDto.operatingSystem,
                    device: saveTypeQueryDto.device,
                    modelDevice: saveTypeQueryDto.modelDevice,
                    requestIp: saveTypeQueryDto.requestIp,
                },
                type: QueryTypes.INSERT,
                raw: true,
            });
            return customerCreditQuery;
        } catch (error) {
            console.log('---------error', error);
            this.logger
                .child({ class: this.toString(), method: this.saveCustomerCreditQuery.name, ...saveTypeQueryDto })
                .error(error);
        }
    }
    async getCustomerCreditQueriesCounted(
        operationTypeByDateQueries: IOperationTypeByDateQueries,
    ): Promise<IRowsCounted[]> {
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetCustomerCreditQueriesCounted]
                @StartDate = $startDate,
                @EndDate = $endDate`;

            const operationTypesCounted: IRowsCounted[] = await this.connection.query(query, {
                bind: {
                    startDate: operationTypeByDateQueries.startDate,
                    endDate: operationTypeByDateQueries.endDate,
                },
                type: QueryTypes.SELECT,
                raw: true,
            });

            return operationTypesCounted;
        } catch (error) {
            console.log('---------error', error);
            this.logger
                .child({ class: this.toString(), method: this.getCustomerCreditQueriesCounted.name })
                .error(error);
            throw new InternalServerErrorException();
        }
    }

    toString() {
        return CustomerCreditQueriesSqlServerService.name;
    }
}

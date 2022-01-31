import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { IQueryTypesRepository } from './query-types.repository';
import { QueryTypes, Sequelize } from 'sequelize';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { IOperationTypeByDateQueries } from '../../../shared/interfaces/operation-type-by-date-queries';
import { IQueryTypesGroupedByDay } from './interfaces/query-types-grouped-by-day';
import { IQueryFeeAndCustomersAccounting } from './interfaces/fee-and-customers-counted';

@Injectable()
export class QueryTypesSqlServerService implements IQueryTypesRepository {
    constructor(
        @InjectConnection(NameConnectionEnum.NAME_CONNECTION) private connection: Sequelize,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}
    getQueryTypesGroupedByCustomer(operationTypeQueries: IOperationTypeByDateQueries) {
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetQueryTypesGroupedByDocumentType]
                @StartDate = $startDate,
                @EndDate = $endDate`;

            const queryTypesByCustomer = this.connection.query(query, {
                bind: {
                    startDate: operationTypeQueries.startDate,
                    endDate: operationTypeQueries.endDate,
                },
                type: QueryTypes.SELECT,
                raw: true,
            });

            return queryTypesByCustomer;
        } catch (error) {
            console.log('---------error', error);
            this.logger
                .child({ class: this.toString(), method: this.getQueryTypesGroupedByCustomer.name })
                .error(error);
            throw new InternalServerErrorException();
        }
    }
    getQueryTypeGroupedsByDevice(operationTypeQueries: IOperationTypeByDateQueries) {
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetQueryTypesGroupedByDevice]
                @StartDate = $startDate,
                @EndDate = $endDate`;

            const queryTypeGroupedsByDevice = this.connection.query(query, {
                bind: {
                    startDate: operationTypeQueries.startDate,
                    endDate: operationTypeQueries.endDate,
                },
                type: QueryTypes.SELECT,
                raw: true,
            });

            return queryTypeGroupedsByDevice;
        } catch (error) {
            console.log('---------error', error);
            this.logger
                .child({ class: this.toString(), method: this.getQueryTypeGroupedsByDevice.name })
                .error(error);
            throw new InternalServerErrorException();
        }
    }
    async getQueryTypesByGroupedDay(
        operationTypeByDateQueries: IOperationTypeByDateQueries,
    ): Promise<IQueryTypesGroupedByDay[]> {
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetQueryTypesGroupedByDay]
                @StartDate = $startDate,
                @EndDate = $endDate`;

            const operationTypesCounted: IQueryTypesGroupedByDay[] = await this.connection.query(query, {
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
                .child({ class: this.toString(), method: this.getQueryTypesByGroupedDay.name })
                .error(error);
            throw new InternalServerErrorException();
        }
    }
    toString() {
        return QueryTypesSqlServerService.name;
    }
    async getQueryFeeAndCustomersAccounting(
        operationTypeByDateQueries: IOperationTypeByDateQueries,
    ){
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetQueryFeeAndCustomersAccounting]
                @StartDate = $startDate,
                @EndDate = $endDate`;

            const FeeAndCustomers: IQueryFeeAndCustomersAccounting[] = await this.connection.query(query, {
                bind: {
                    startDate: operationTypeByDateQueries.startDate,
                    endDate: operationTypeByDateQueries.endDate,
                },
                type: QueryTypes.SELECT,
                raw: true,
            });

            return FeeAndCustomers;
        } catch (error) {
            console.log('---------error', error);
            this.logger
                .child({ class: this.toString(), method: this.getQueryTypesByGroupedDay.name })
                .error(error);
            throw new InternalServerErrorException();
        }
    }

}

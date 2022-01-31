import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import { Logger } from 'winston';

import { IOperationTypeByDateQueries } from 'src/shared/interfaces/operation-type-by-date-queries';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { IFeeQueriesRepository } from './fee-queries.repository';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { SaveTypeQueryDto } from 'src/query-types/adapters/in/dtos/save-query-type-by-customer.dto';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { ISpGetFeeQueries } from './sp-interfaces/sp-get-fee-queries';
import { IRowsCounted } from '../../../shared/interfaces/stored-procedures/rows-counted';

@Injectable()
export class FeeQueriesSqlServerService implements IFeeQueriesRepository {
    constructor(
        @InjectConnection(NameConnectionEnum.NAME_CONNECTION) private connection: Sequelize,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}
    async saveFeeQuery(saveTypeQueryDto: SaveTypeQueryDto) {
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spInsertFeePaymentQuery] 
                @CustomerId = $customerId, 
                @CreditId = $creditId,
                @OperaringSystem = $operatingSystem,
                @Device = $device,
                @ModelDevice = $modelDevice,
                @RequestIp = $requestIp`;

            const _statistic = await this.connection.query(query, {
                bind: {
                    customerId: saveTypeQueryDto.customerId,
                    creditId: saveTypeQueryDto.creditId,
                    operatingSystem: saveTypeQueryDto.operatingSystem,
                    device: saveTypeQueryDto.device,
                    modelDevice: saveTypeQueryDto.modelDevice,
                    requestIp: saveTypeQueryDto.requestIp,
                },
                type: QueryTypes.INSERT,
                raw: true,
            });

            return _statistic;
        } catch (error) {
            console.log('---------error', error);
            this.logger
                .child({ class: this.toString(), method: this.saveFeeQuery.name, ...saveTypeQueryDto })
                .error(error);
        }
    }
    async getFeePaymentQueries(queries: ISetQueries): Promise<ISpGetFeeQueries[]> {
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetFeePaymentQueries] 
              @OrderBy = $orderBy, 
              @Size = $size, 
              @offset = $offset`;

            const feeQueries: ISpGetFeeQueries[] = await this.connection.query(query, {
                bind: {
                    orderBy: queries.orderBy,
                    size: queries.size,
                    offset: queries.offset,
                },
                type: QueryTypes.SELECT,
                raw: true,
            });

            return feeQueries;
        } catch (error) {
            console.log('---------error', error);
            this.logger
                .child({ class: this.toString(), method: this.getFeePaymentQueries.name, ...queries })
                .error(error);
            throw new InternalServerErrorException();
        }
    }
    async getFeePaymentQueriesCounted(
        operationTypeByDateQueries: IOperationTypeByDateQueries,
    ): Promise<IRowsCounted[]> {
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetFeePaymentQueriesCounted]
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
                .child({ class: this.toString(), method: this.getFeePaymentQueriesCounted.name })
                .error(error);
            throw new InternalServerErrorException();
        }
    }
    getQueryTypesByCustomer(operationTypeByDateQueries: IOperationTypeByDateQueries) {
        const startMonth = operationTypeByDateQueries.startDate.split('-')[1];
        const endMonth = operationTypeByDateQueries.endDate.split('-')[1];

        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetQueryStatisticsByDocumentType]
            @StartMonth = $startMonth,
            @EndMonth = $endMonth`;

            const operationTypesCounted = this.connection.query(query, {
                bind: {
                    startMonth,
                    endMonth,
                },
                type: QueryTypes.SELECT,
                raw: true,
            });

            return operationTypesCounted;
        } catch (error) {
            console.log('---------error', error);
            this.logger.child({ class: this.toString(), method: this.getQueryTypesByCustomer.name }).error(error);
            throw new InternalServerErrorException();
        }
    }
    toString() {
        return FeeQueriesSqlServerService.name;
    }
}

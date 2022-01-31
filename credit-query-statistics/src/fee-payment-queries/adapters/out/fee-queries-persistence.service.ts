import { Injectable } from '@nestjs/common';
import { IGetFeeQueriesRequest } from 'src/fee-payment-queries/application/ports/in/get-fee-queries.request';
import { ISaveFeeQueryTypeFromQueryTypesRequest } from 'src/query-types/application/ports/in/other-domain/save-fee-query-from-query-type.request';
import { FeeQueriesSqlServerService } from './fee-queries-sql-server.service';
import { IFeeQueriesRepository } from './fee-queries.repository';
import { SaveTypeQueryDto } from '../../../query-types/adapters/in/dtos/save-query-type-by-customer.dto';
import { IGetFeeQueriesCountedFromQueryTypeStatistictsPort } from 'src/query-type-statistics/application/ports/out/other-domains/get-fee-queries-counted-from-query-type-statistic.port';
import { IOperationTypeByDateQueries } from 'src/shared/interfaces/operation-type-by-date-queries';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { ISpGetFeeQueries } from './sp-interfaces/sp-get-fee-queries';
import { IRowsCounted } from '../../../shared/interfaces/stored-procedures/rows-counted';

@Injectable()
export class FeeQueriesPersistenceService
    implements
        ISaveFeeQueryTypeFromQueryTypesRequest,
        IGetFeeQueriesRequest,
        IGetFeeQueriesCountedFromQueryTypeStatistictsPort
{
    private feeQueriesRepository: IFeeQueriesRepository;

    constructor(feeQueriesSqlServer: FeeQueriesSqlServerService) {
        this.feeQueriesRepository = feeQueriesSqlServer;
    }
    saveFeeQuery(saveTypeQueryDto: SaveTypeQueryDto): void {
        this.feeQueriesRepository.saveFeeQuery(saveTypeQueryDto);
    }
    getFeeQueries(queries: ISetQueries): Promise<ISpGetFeeQueries[]> {
        return this.feeQueriesRepository.getFeePaymentQueries(queries);
    }
    getFeePaymentQueriesCounted(operationTypeQueries: IOperationTypeByDateQueries): Promise<IRowsCounted[]> {
        return this.feeQueriesRepository.getFeePaymentQueriesCounted(operationTypeQueries);
    }
}

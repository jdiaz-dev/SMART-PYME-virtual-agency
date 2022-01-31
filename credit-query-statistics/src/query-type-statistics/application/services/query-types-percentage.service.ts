import { Injectable } from '@nestjs/common';

import { IQueryTypesPercentageUseCase } from '../ports/in/query-types-percentage-use-case';
import { OperationTypesPercentage, IOperationType } from '../../domain/operation-types-percentage';
import { IGetFeeQueriesCountedFromQueryTypeStatistictsPort } from '../ports/out/other-domains/get-fee-queries-counted-from-query-type-statistic.port';
import { IOperationTypeByDateQueries } from 'src/shared/interfaces/operation-type-by-date-queries';
import { FeeQueriesPersistenceService } from '../../../fee-payment-queries/adapters/out/fee-queries-persistence.service';

@Injectable()
export class QueryTypesPercentageService implements IQueryTypesPercentageUseCase {
    private getFeeQueriesCountedPort: IGetFeeQueriesCountedFromQueryTypeStatistictsPort;

    constructor(feeQueriesPersistence: FeeQueriesPersistenceService) {
        this.getFeeQueriesCountedPort = feeQueriesPersistence;
    }
    async operationTypesPercentage(
        operationTypeQueries: IOperationTypeByDateQueries,
    ) /* Promise<IOperationType[]> */ {
        /* const operationsWithPercentage: OperationTypesPercentage =
            await this.getOperationTypesCountedPort.getQueryTypesForPercentage(operationTypeQueries);
        return operationsWithPercentage.calculatePercentages(); */
    }
}

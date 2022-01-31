import { IOperationTypeByDateQueries } from './../../../../../shared/interfaces/operation-type-by-date-queries';
import { IRowsCounted } from './../../../../../shared/interfaces/stored-procedures/rows-counted';

export interface IGetCustomerCreditQueriesCountedFromQueryTypeStatisticsPort {
    getCustomerCreditQueriesCounted(
        operationTypeByDateQueries: IOperationTypeByDateQueries,
    ): Promise<IRowsCounted[]>;
}

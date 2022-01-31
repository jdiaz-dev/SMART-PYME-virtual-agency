import { IOperationTypeByDateQueries } from 'src/shared/interfaces/operation-type-by-date-queries';
import { IRowsCounted } from 'src/shared/interfaces/stored-procedures/rows-counted';

export interface IGetFeeQueriesCountedFromQueryTypeStatistictsPort {
    getFeePaymentQueriesCounted(operationTypeByDateQueries: IOperationTypeByDateQueries): Promise<IRowsCounted[]>;
}

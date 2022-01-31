import { IQueryFeeAndCustomersAccounting } from '../../../../adapters/out/interfaces/fee-and-customers-counted';
import { IOperationTypeByDateQueries } from '../../../../../shared/interfaces/operation-type-by-date-queries';

export interface IGetQueryFeeAndCustomersAccounting {
    getQueryFeeAndCustomersAccounting(operationTypeByDateQueries: IOperationTypeByDateQueries,): Promise<IQueryFeeAndCustomersAccounting[]>;
}

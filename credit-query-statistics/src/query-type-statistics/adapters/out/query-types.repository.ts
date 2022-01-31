import { IOperationTypeByDateQueries } from '../../../shared/interfaces/operation-type-by-date-queries';
import { IQueryTypesGroupedByDay } from './interfaces/query-types-grouped-by-day';

export interface IQueryTypesRepository {
    getQueryFeeAndCustomersAccounting(operationTypeByDateQueries: IOperationTypeByDateQueries);
    getQueryTypesGroupedByCustomer(operationTypeByDateQueries: IOperationTypeByDateQueries);
    getQueryTypeGroupedsByDevice(operationTypeByDateQueries: IOperationTypeByDateQueries);
    getQueryTypesByGroupedDay(
        operationTypeByDateQueries: IOperationTypeByDateQueries,
    ): Promise<IQueryTypesGroupedByDay[]>;
}

import { IOperationTypeByDateQueries } from '../../../../shared/interfaces/operation-type-by-date-queries';

export interface IGetQueryTypeGroupedByDayRequest {
    getQueryTypesGroupedByDay(operationTypeByDateQueries: IOperationTypeByDateQueries);
}

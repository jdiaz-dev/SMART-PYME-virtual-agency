import { IOperationTypeByDateQueries } from '../../../../shared/interfaces/operation-type-by-date-queries';

export interface IGetQueryTypesByGroupedCustomerRequest {
    getQueryTypesGroupedByCustomer(operationTypeQueries: IOperationTypeByDateQueries);
}

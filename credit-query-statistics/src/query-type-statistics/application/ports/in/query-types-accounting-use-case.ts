import { IOperationTypeByDateQueries } from '../../../../shared/interfaces/operation-type-by-date-queries';

export interface IQueryTypesAccountingUseCase {
    queryTypesAccounting(operationTypeQueries: IOperationTypeByDateQueries);
}

import { IOperationTypeByDateQueries } from '../../../../shared/interfaces/operation-type-by-date-queries';

export interface IQueryTypesPercentageUseCase {
    operationTypesPercentage(operationTypeQueries: IOperationTypeByDateQueries): any;
}

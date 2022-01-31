import { IOperationTypeByDateQueries } from '../../../../shared/interfaces/operation-type-by-date-queries';

export interface IGetQueryTypesGroupedByDeviceRequest {
    getQueryTypeGroupedsByDevice(operationTypeQueries: IOperationTypeByDateQueries);
}

import { Injectable } from '@nestjs/common';

import { QueryTypesSqlServerService } from './query-types-sql-server.service';
import { IQueryTypesRepository } from './query-types.repository';
import { IQueryTypesRequest } from '../../../query-types/application/ports/in/self-domain/get-query-types.request';

import { IOperationTypeByDateQueries } from '../../../shared/interfaces/operation-type-by-date-queries';

import { OperationTypesPercentage } from '../../domain/operation-types-percentage';
import { IGetQueryTypesByGroupedCustomerRequest } from '../../application/ports/in/get-query-types-by-customer.request';
import { IGetQueryTypesGroupedByDeviceRequest } from '../../application/ports/in/get-query-types-by-device.request';
import { IGetQueryTypeGroupedByDayRequest } from '../../application/ports/in/get-query-types-by-day.request';
import { IQueryTypesGroupedByDay } from './interfaces/query-types-grouped-by-day';
import { IQueryFeeAndCustomersAccounting } from "./interfaces/fee-and-customers-counted";
@Injectable()
/* IGetQueryTypesCountedRequest,
        IGetQueryTypesCountedPort, */
export class QueryTypesPersistenceService
    implements
        IQueryTypesRequest,
        IGetQueryTypesByGroupedCustomerRequest,
        IGetQueryTypesGroupedByDeviceRequest,
        IGetQueryTypeGroupedByDayRequest
{
    private queryTypesRepository: IQueryTypesRepository;

    constructor(queryTypesSqlServerService: QueryTypesSqlServerService) {
        this.queryTypesRepository = queryTypesSqlServerService;
    }
    getQueryTypes(): any {
        //return this.queryTypesRepository.getOperationTypes();
    }
    getQueryTypesGroupedByCustomer(operationTypeQueries: IOperationTypeByDateQueries) {
        return this.queryTypesRepository.getQueryTypesGroupedByCustomer(operationTypeQueries);
    }
    getQueryTypeGroupedsByDevice(operationTypeQueries: IOperationTypeByDateQueries) {
        return this.queryTypesRepository.getQueryTypeGroupedsByDevice(operationTypeQueries);
    }
    getQueryTypesGroupedByDay(
        operationTypeByDateQueries: IOperationTypeByDateQueries,
    ): Promise<IQueryTypesGroupedByDay[]> {
        return this.queryTypesRepository.getQueryTypesByGroupedDay(operationTypeByDateQueries);
    }
    getQueryFeeAndCustomersAccounting(
        operationTypeByDateQueries: IOperationTypeByDateQueries,
    ): Promise<IQueryFeeAndCustomersAccounting[]>{
        return this.queryTypesRepository.getQueryFeeAndCustomersAccounting(operationTypeByDateQueries);
    }
}

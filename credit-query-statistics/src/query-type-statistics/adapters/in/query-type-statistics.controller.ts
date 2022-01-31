import { Controller, Get, UseInterceptors, Query } from '@nestjs/common';

import { RecordsMapperService } from '../../../../../shared/services/records-mapper.service';
import { QueryTypesPersistenceService } from '../out/query-types-persistence.service';
import { BaseResponseInterceptor } from '../../../../../shared/interceptors/base-response.interceptor';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IQueryTypesPercentageUseCase } from '../../application/ports/in/query-types-percentage-use-case';
import { QueryTypesPercentageService } from '../../application/services/query-types-percentage.service';
import { OperationTypesResponse } from './dtos/get-operation-types-accounting.dto';
import { IGetQueryTypesByGroupedCustomerRequest } from '../../application/ports/in/get-query-types-by-customer.request';
import { IGetQueryTypesGroupedByDeviceRequest } from '../../application/ports/in/get-query-types-by-device.request';
import { QueryTypesByCustomerResponse } from './dtos/get-query-types-by-customer.dto';
import { OperationTypesByDeviceResponse } from './dtos/get-operation-types-by-device.dto ';
import { IGetQueryTypeGroupedByDayRequest } from '../../application/ports/in/get-query-types-by-day.request';
import { OperationTypesByDayResponse } from './dtos/get-query-types-by-day.dto';

import { IOperationTypeByDateQueries } from '../../../shared/interfaces/operation-type-by-date-queries';
import { IQueryTypesRequest } from 'src/query-types/application/ports/in/self-domain/get-query-types.request';
import { IQueryTypesAccountingUseCase } from 'src/query-type-statistics/application/ports/in/query-types-accounting-use-case';
import { QueryTypesAccountingService } from './../../application/services/query-types-accounting.service';

const entity = 'query-type-statistics';
@ApiTags(entity)
@Controller({
    path: entity,
    version: '1',
})
@UseInterceptors(BaseResponseInterceptor)
export class QueryTypeStatisticsController {
    private queryTypesRequest: IQueryTypesRequest;
    private queryTypesAccountingUseCase: IQueryTypesAccountingUseCase;
    private queryTypesPercentageUseCase: IQueryTypesPercentageUseCase;
    private getQueryTypesByGroupedCustomer: IGetQueryTypesByGroupedCustomerRequest;
    private getQueryTypesGroupedByDevice: IGetQueryTypesGroupedByDeviceRequest;
    private getQueryTypeGroupedByDayRequest: IGetQueryTypeGroupedByDayRequest;
    queryFeeAndCustomersAccounting: QueryTypesAccountingService;

    constructor(
        private recordsMapperService: RecordsMapperService,
        queryTypesPersistenceService: QueryTypesPersistenceService,
        queryTypesPercentageService: QueryTypesPercentageService,
        queryTypesAccountingService: QueryTypesAccountingService,
    ) {
        //request
        this.queryTypesRequest = queryTypesPersistenceService;
        this.getQueryTypesByGroupedCustomer = queryTypesPersistenceService;
        this.getQueryTypesGroupedByDevice = queryTypesPersistenceService;
        this.getQueryTypeGroupedByDayRequest = queryTypesPersistenceService;

        //use case
        this.queryTypesPercentageUseCase = queryTypesPercentageService;
        this.queryTypesAccountingUseCase = queryTypesAccountingService;
        this.queryFeeAndCustomersAccounting = queryTypesAccountingService;
    }

    @Get('accounting')
    @ApiOkResponse({ type: OperationTypesResponse })
    async getOperationTypesAccounting(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
        const queries: IOperationTypeByDateQueries = { startDate, endDate };
        return this.queryTypesAccountingUseCase.queryTypesAccounting(queries);
    }

    @Get('percentage')
    @ApiOkResponse({ type: OperationTypesResponse })
    async getOperationTypesPercentage(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
        const queries: IOperationTypeByDateQueries = { startDate, endDate };
        const operationTypesInPercentage = await this.queryTypesPercentageUseCase.operationTypesPercentage(
            queries,
        );
        return this.recordsMapperService.mapRecords(operationTypesInPercentage);
    }

    @Get('customers')
    @ApiOkResponse({ type: QueryTypesByCustomerResponse })
    async getQueryTypesByCustomer(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
        const queries: IOperationTypeByDateQueries = { startDate, endDate };
        const operationTypesByCustomer = await this.getQueryTypesByGroupedCustomer.getQueryTypesGroupedByCustomer(
            queries,
        );
        const result: any = this.recordsMapperService.mapRecords(operationTypesByCustomer);

        result.map((item) => {
            if (item.documentType === 'DNI') item.customerType = 'person';
            if (item.documentType === 'RUC') item.customerType = 'business';

            delete item.documentType;
        });
        return result;
    }

    @Get('device')
    @ApiOkResponse({ type: OperationTypesByDeviceResponse })
    async getQueryTypeByDevices(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
        const queries: IOperationTypeByDateQueries = { startDate, endDate };
        const operationTypesByDevice = await this.getQueryTypesGroupedByDevice.getQueryTypeGroupedsByDevice(
            queries,
        );
        return this.recordsMapperService.mapRecords(operationTypesByDevice);
    }
    @Get('daily')
    @ApiOkResponse({ type: OperationTypesByDayResponse })
    async getQueryTypeGroupedByDay(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
        const queries: IOperationTypeByDateQueries = { startDate, endDate };
        const operationTypesByDay = await this.getQueryTypeGroupedByDayRequest.getQueryTypesGroupedByDay(queries);

        return this.recordsMapperService.mapRecords(operationTypesByDay);
    }
}

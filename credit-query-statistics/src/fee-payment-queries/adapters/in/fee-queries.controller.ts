import { Controller, DefaultValuePipe, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { LimitPipe } from '../../../../../shared/pipes/limit.pipe';
import { RecordsMapperService } from '../../../../../shared/services/records-mapper.service';
import { FeeQueriesPersistenceService } from '../out/fee-queries-persistence.service';
import { MapperService } from '../../../shared/interfaces/services/mapper.service';
import { IGetFeeQueriesRequest } from '../../application/ports/in/get-fee-queries.request';
import { FeeQueryResponse } from './dtos/get-query-type-by-customer.dto';

const entity = 'fee-queries';
@ApiTags(entity)
@Controller({
    path: entity,
    version: '1',
})
export class FeeQueriesController {
    private getFeeQueriesRequest: IGetFeeQueriesRequest;

    constructor(
        private mapperService: MapperService,
        private recordsMapperService: RecordsMapperService,
        feeQueriesPersistence: FeeQueriesPersistenceService,
    ) {
        this.getFeeQueriesRequest = feeQueriesPersistence;
    }

    @Get()
    @ApiOkResponse({ type: FeeQueryResponse })
    async getQueryTypesWithCustomer(
        @Query('orderBy', new DefaultValuePipe('creditGUID')) orderBy: string,
        @Query('size', new DefaultValuePipe(30), ParseIntPipe, LimitPipe) size: number,
        @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
        @Query('search', new DefaultValuePipe('')) search: string,
    ) {
        const queries: ISetQueries = { orderBy, size, offset, search };
        const statistics = await this.getFeeQueriesRequest.getFeeQueries(queries);
        const { total, results }: any = this.recordsMapperService.mapRecords(statistics, queries);

        this.mapperService.mapForAppMarketing(results);
        return {
            results,
            start: offset,
            size,
            totalItems: total,
        };
    }
}

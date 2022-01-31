import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { QueryTypesPersistenceService } from '../out/query-types-persistence.service';
import { RecordsMapperService } from '../../../../../shared/services/records-mapper.service';
//import { ValidateUiidPipe } from './../../../../../shared/pipes/validate-uuid.pipe';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ISaveFeeQueryTypeFromQueryTypesRequest } from '../../application/ports/in/other-domain/save-fee-query-from-query-type.request';
import { CreditQueryStatistic } from './decorators/credit-query-statistic.decorator';
import { SaveTypeQueryDto, SaveQueryTypeResponse } from './dtos/save-query-type-by-customer.dto';
import { TransformUserAgentPipe } from './pipes/transform-user-agent.pipe';
import { IQueryTypesRequest } from '../../application/ports/in/self-domain/get-query-types.request';
import { BaseResponseInterceptor } from '../../../../../shared/interceptors/base-response.interceptor';
import { QueryTypesResponse } from './dtos/query-types-response.dto';
import { FeeQueriesPersistenceService } from '../../../fee-payment-queries/adapters/out/fee-queries-persistence.service';
import { ISaveCustomerCreditQueryFromQueryTypesRequest } from './../../application/ports/in/other-domain/save-customer-credit-query-from-query-type.request';
import { QueryTypeIdsEnum } from '../../../shared/enums/query-type-ids';
import { CustomerCreditQueriesPersistenceService } from './../../../customer-credit-queries/adapters/out/customer-credit-queries-persistence.service';

const entity = 'query-types';
@ApiTags(entity)
@Controller({
    path: entity,
    version: '1',
})
export class QueryTypesController {
    private saveFeeQueryTypeFromQueryTypes: ISaveFeeQueryTypeFromQueryTypesRequest;
    private saveCustomerCreditQueryFromQueryType: ISaveCustomerCreditQueryFromQueryTypesRequest;
    private queryTypesRequest: IQueryTypesRequest;

    constructor(
        private recordsMapperService: RecordsMapperService,
        queryTypesPersistenceService: QueryTypesPersistenceService,

        //other domain
        feeQueriesPersistenceService: FeeQueriesPersistenceService,
        customerCreditQueriesPersistence: CustomerCreditQueriesPersistenceService,
    ) {
        this.queryTypesRequest = queryTypesPersistenceService;

        //other domain
        this.saveFeeQueryTypeFromQueryTypes = feeQueriesPersistenceService;
        this.saveCustomerCreditQueryFromQueryType = customerCreditQueriesPersistence;
    }
    @Get()
    @UseInterceptors(BaseResponseInterceptor)
    @ApiOkResponse({ type: QueryTypesResponse })
    async getQueryTypes() {
        const queryTypes = await this.queryTypesRequest.getQueryTypes();
        return this.recordsMapperService.mapRecords(queryTypes);
    }
    @Post('/:queryTypeId')
    @ApiOkResponse({ type: SaveQueryTypeResponse })
    saveQueryStatistic(
        @Param('queryTypeId') queryTypeId: string,
        @CreditQueryStatistic(TransformUserAgentPipe) creditQueryStatistic: SaveTypeQueryDto,
    ) {
        if (queryTypeId == QueryTypeIdsEnum.FEE_QUERY_ID)
            return this.saveFeeQueryTypeFromQueryTypes.saveFeeQuery(creditQueryStatistic);

        if (queryTypeId == QueryTypeIdsEnum.CUSTOMER_CREDIT_QUERY_ID)
            return this.saveCustomerCreditQueryFromQueryType.saveCustomerCreditQuery(creditQueryStatistic);
    }
}

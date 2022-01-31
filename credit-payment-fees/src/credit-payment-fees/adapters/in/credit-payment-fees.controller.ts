import { Controller, DefaultValuePipe, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IGetCreditPaymentFeesRequest } from 'src/credit-payment-fees/application/in/get-credit-payment-fees.request';
import { BaseResponseInterceptor } from '../../../../../shared/interceptors/base-response.interceptor';
import { CreditPaymentFeesPersistenceService } from '../out/credit-payment-fees-persistence.service';
import { RecordsMapperService } from '../../../../../shared/services/records-mapper.service';
import { CreditPaymentFeesResponse } from './dtos/get-credit-payment-fees.dto';
import { ValidateUiidPipe } from './../../../../../shared/pipes/validate-uuid.pipe';
import { ISetQueriesFees } from './interfaces/set.queries-fees';
import { ISetParamsFees } from './interfaces/set-params-fees';

@ApiTags('credit-payment-fees')
@Controller({
    path: 'customers/:customerGUID/credits/:creditGUID/credit-payment-fees',
    version: '1',
})
@UseInterceptors(BaseResponseInterceptor)
export class CreditPaymentFeesController {
    private getCreditPaymentFeesRequest: IGetCreditPaymentFeesRequest;

    constructor(
        creditPaymentFeesPersistenceService: CreditPaymentFeesPersistenceService,
        private recordsMapperService: RecordsMapperService,
    ) {
        this.getCreditPaymentFeesRequest = creditPaymentFeesPersistenceService;
    }

    @Get()
    @ApiOkResponse({ type: CreditPaymentFeesResponse })
    async getCreditPaymentFees(
        @Param('customerGUID', ValidateUiidPipe) customerGUID: string,
        @Param('creditGUID', ValidateUiidPipe) creditGUID: string,
        @Query('statusFeeId', new DefaultValuePipe('2')) statusFeeId: string,
        @Query('size', new DefaultValuePipe('1')) size: string,
    ) {
        const params: ISetParamsFees = { customerGUID, creditGUID };
        const queries: ISetQueriesFees = { statusFeeId, size };
        const cretitPaymentFees = await this.getCreditPaymentFeesRequest.getCreditPaymentFees(params, queries);
        return this.recordsMapperService.mapRecords(cretitPaymentFees);
    }
}

import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreditsResponse } from './dtos/get-credits.dto';
import { CreditResponse } from './dtos/get-credit.dto';
import { BaseResponseInterceptor } from '../../../../../shared/interceptors/base-response.interceptor';
import { ValidateUiidPipe } from './../../../../../shared/pipes/validate-uuid.pipe';
import { RecordsMapperService } from '../../../../../shared/services/records-mapper.service';
import { IPercentageAmountPayedUseCase } from 'src/credits/application/ports/in/credits/percentage-amount-payed-use-case';
import { PercentageAmountPaidService } from './../../application/services/percentage-amount-paid.service';
import { IGetCreditUseCase } from '../../application/ports/in/credits/get-credit.use-case';
import { CreditsPersistenceService } from '../out/credits-persistence.service';
import { ICreditParams } from './interfaces/credit-params';
import { GetCreditService } from './../../application/services/get-credit.service';

const entity = 'credits';
@ApiTags(entity)
@Controller({
    path: 'customers/:customerGUID/credits',
    version: '1',
})
@UseInterceptors(BaseResponseInterceptor)
export class CreditsController {
    private percentageAmountPayedUseCase: IPercentageAmountPayedUseCase;

    private getCreditUseCase: IGetCreditUseCase;

    constructor(
        public recordsMapperService: RecordsMapperService,
        getCreditService: GetCreditService,
        percentageAmountPaidService: PercentageAmountPaidService,

        //persistence directty
        creditsPersistenceService: CreditsPersistenceService,
    ) {
        this.getCreditUseCase = getCreditService;
        this.percentageAmountPayedUseCase = percentageAmountPaidService;
    }
    @Get('/:creditGUID')
    @ApiOkResponse({ type: CreditResponse })
    async getCredit(
        @Param('customerGUID', ValidateUiidPipe) customerGUID: string,
        @Param('creditGUID', ValidateUiidPipe) creditGUID: string,
    ) {
        const creditParams: ICreditParams = { customerGUID, creditGUID };
        const credit = await this.getCreditUseCase.getCreditAndSendEmail(creditParams);
        const _credit = this.recordsMapperService.mapUniqueRecord(credit);
        return _credit;
    }
    @Get()
    @ApiOkResponse({ type: CreditsResponse })
    async getCredits(@Param('customerGUID', ValidateUiidPipe) customerGUID: string) {
        const credits = await this.percentageAmountPayedUseCase.calculatePercentageByCredit(customerGUID);
        return this.recordsMapperService.mapRecords(credits);
    }
}

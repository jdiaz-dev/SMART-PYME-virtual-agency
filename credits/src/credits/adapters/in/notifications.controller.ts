import { Body, Controller, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ValidateUiidPipe } from '../../../../../shared/pipes/validate-uuid.pipe';
import { EmailReceptorDto } from './dtos/email-receptor';
import { IGetCreditUseCase } from './../../application/ports/in/credits/get-credit.use-case';
import { GetCreditService } from './../../application/services/get-credit.service';
import { ICreditParams } from './interfaces/credit-params';
import { BaseResponseInterceptor } from '../../../../../shared/interceptors/base-response.interceptor';

const entity = 'notifications';
@ApiTags(entity)
@Controller({
    version: '1',
    path: entity,
})
@UseInterceptors(BaseResponseInterceptor)
export class NotificationsController {
    private getCreditUseCase: IGetCreditUseCase;

    constructor(getCreditService: GetCreditService) {
        this.getCreditUseCase = getCreditService;
    }
    @Post('customers/:customerGUID/credits/:creditGUID')
    notifyCredit(
        @Param('customerGUID', ValidateUiidPipe) customerGUID: string,
        @Param('creditGUID', ValidateUiidPipe) creditGUID: string,
        @Body() receptor: EmailReceptorDto,
    ) {
        const creditParams: ICreditParams = { customerGUID, creditGUID };
        return this.getCreditUseCase.getCreditAndSendEmail(creditParams, receptor.emailReceptor);
    }
}

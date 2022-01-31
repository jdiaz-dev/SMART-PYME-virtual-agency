import { Injectable } from '@nestjs/common';
import { IGetCreditPaymentFeesRequest } from 'src/credit-payment-fees/application/in/get-credit-payment-fees.request';
import { ISetParamsFees } from '../in/interfaces/set-params-fees';
import { ISetQueriesFees } from '../in/interfaces/set.queries-fees';
import { CreditPaymentFeesSqlServerService } from './credit-payment-fees-sql-server.service';
import { ICreditPaymentFeesRepository } from './credit-payment-fees.repository';
import { ISpGetDetailCreditPaymentFee } from './sp-interfaces/sp-get-detail-credit-payment-fee';

@Injectable()
export class CreditPaymentFeesPersistenceService implements IGetCreditPaymentFeesRequest {
    private creditPaymentFeesRepository: ICreditPaymentFeesRepository;

    constructor(creditPaymentFeesSqlServer: CreditPaymentFeesSqlServerService) {
        this.creditPaymentFeesRepository = creditPaymentFeesSqlServer;
    }
    getCreditPaymentFees(
        setParamsFees: ISetParamsFees,
        setQueriesFees: ISetQueriesFees,
    ): Promise<ISpGetDetailCreditPaymentFee[]> {
        return this.creditPaymentFeesRepository.getCreditPaymentFees(setParamsFees, setQueriesFees);
    }
}

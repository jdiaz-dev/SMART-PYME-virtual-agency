import { ISetQueriesFees } from './../../adapters/in/interfaces/set.queries-fees';
import { ISetParamsFees } from './../../adapters/in/interfaces/set-params-fees';
import { ISpGetDetailCreditPaymentFee } from 'src/credit-payment-fees/adapters/out/sp-interfaces/sp-get-detail-credit-payment-fee';

export interface IGetCreditPaymentFeesRequest {
    getCreditPaymentFees(
        setParamsFees: ISetParamsFees,
        setQueriesFees: ISetQueriesFees,
    ): Promise<ISpGetDetailCreditPaymentFee[]>;
}

import { ISetQueriesFees } from './../in/interfaces/set.queries-fees';
import { ISetParamsFees } from './../in/interfaces/set-params-fees';
import { ISpGetDetailCreditPaymentFee } from './sp-interfaces/sp-get-detail-credit-payment-fee';

export interface ICreditPaymentFeesRepository {
    getCreditPaymentFees(
        setParamsFees: ISetParamsFees,
        setQueriesFees: ISetQueriesFees,
    ): Promise<ISpGetDetailCreditPaymentFee[]>;
}

import { ICreditParams } from '../../../adapters/in/interfaces/credit-params';
import { ISpGetDetailCredit } from '../../../adapters/out/sp-interfaces/sp-get-detail-credit';

export interface IGetCreditPort {
    getCredit(creditParams: ICreditParams): Promise<ISpGetDetailCredit[]>;
}

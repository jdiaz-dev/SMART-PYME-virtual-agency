import { ICreditParams } from 'src/credits/adapters/in/interfaces/credit-params';
import { ISpGetDetailCredit } from './sp-interfaces/sp-get-detail-credit';
import { ISpGetDetailCredits } from './sp-interfaces/sp-get-detail-credits';

export interface ICreditsRepository {
    getCredit(creditParams: ICreditParams): Promise<ISpGetDetailCredit[]>;
    getCredits(customerGUID: string): Promise<ISpGetDetailCredits[]>;
}

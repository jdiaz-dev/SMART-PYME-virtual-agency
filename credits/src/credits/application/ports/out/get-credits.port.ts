import { FeesPaid } from 'src/credits/domain/fees-paid';
import { ISpGetDetailCredits } from '../../../adapters/out/sp-interfaces/sp-get-detail-credits';

export interface IGetCreditsPort {
    getCredits(customerGUID: string): Promise<ISpGetDetailCredits[]>;
}

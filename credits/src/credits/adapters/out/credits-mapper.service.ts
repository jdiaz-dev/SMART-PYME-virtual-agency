import { Injectable } from '@nestjs/common';
import { FeesPaid } from '../../domain/fees-paid';
import { ISpGetDetailCredits } from './sp-interfaces/sp-get-detail-credits';

@Injectable()
export class CreditsMapperService {
    mapToFeesPaid(credits: ISpGetDetailCredits[]): FeesPaid {
        return new FeesPaid(2, 3);
    }
}

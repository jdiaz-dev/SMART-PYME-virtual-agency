import { Injectable } from '@nestjs/common';
import { IGetCreditPort } from 'src/credits/application/ports/out/get-credit.port';
import { IGetCreditsPort } from 'src/credits/application/ports/out/get-credits.port';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { CreditsSqlServerService } from './credits-sql-server.service';
import { ICreditsRepository } from './credits.repository';
import { ICreditParams } from '../in/interfaces/credit-params';
import { ISpGetDetailCredits } from './sp-interfaces/sp-get-detail-credits';
import { ISpGetDetailCredit } from './sp-interfaces/sp-get-detail-credit';
import { CreditsMapperService } from './credits-mapper.service';
import { FeesPaid } from '../../domain/fees-paid';

@Injectable()
export class CreditsPersistenceService implements IGetCreditsPort, IGetCreditPort {
    private creditsRepository: ICreditsRepository;

    constructor(creditsSqlServer: CreditsSqlServerService, private creditsMapper: CreditsMapperService) {
        this.creditsRepository = creditsSqlServer;
    }
    getCredit(creditParams: ICreditParams): Promise<ISpGetDetailCredit[]> {
        return this.creditsRepository.getCredit(creditParams);
    }
    async getCredits(customerGUID: string): Promise<ISpGetDetailCredits[]> {
        return this.creditsRepository.getCredits(customerGUID);
    }
}

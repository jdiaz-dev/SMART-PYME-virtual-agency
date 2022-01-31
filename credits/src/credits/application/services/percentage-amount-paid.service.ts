import { Inject, Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { IPercentageAmountPayedUseCase } from '../ports/in/credits/percentage-amount-payed-use-case';
import { IGetCreditsPort } from '../ports/out/get-credits.port';
import { IGetStatusFeesPort } from '../ports/out/get-status-fees.port';
import { CreditsPersistenceService } from '../../adapters/out/credits-persistence.service';
import { FeesPaid } from '../../domain/fees-paid';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ErrorMesaggesEnum } from '../../../../../shared/enums/messages-failed-request';
import { NotificationEmailMarketingService } from '../../../../../shared/services/app-marketing/notification-email-marketing.service';

@Injectable()
export class PercentageAmountPaidService implements IPercentageAmountPayedUseCase {
    private getCreditsPort: IGetCreditsPort;
    private getStatusFeesPort: IGetStatusFeesPort;

    constructor(
        creditsPersistence: CreditsPersistenceService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {
        this.getCreditsPort = creditsPersistence;
    }
    async calculatePercentageByCredit(customerId: string): Promise<any> {
        try {
            const credits = await this.getCreditsPort.getCredits(customerId);

            let feesPaid: FeesPaid;

            for (let x = 0; x < credits.length; x++) {
                feesPaid = new FeesPaid(credits[x].Period, credits[x].TotalFeesPaid);
                credits[x]['FeesPaid'] = feesPaid.calculateFeesPaid();
                credits[x]['PercentageAmountPaid'] = feesPaid.calculateFeesPaidInPercentage();
            }

            return credits;
        } catch (error) {
            console.log('---------error', error);
            this.logger
                .child({
                    class: this.toString(),
                    method: this.calculatePercentageByCredit.name,
                    customerId,
                })
                .error(error);

            if (error.response) {
                throw new BadRequestException(ErrorMesaggesEnum.CREDITS_NOT_FOUND);
            }

            throw new InternalServerErrorException();
        }
    }
    toString() {
        return PercentageAmountPaidService.name;
    }
}

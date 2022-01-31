import { Injectable } from '@nestjs/common';
import { IGetCreditUseCase } from '../ports/in/credits/get-credit.use-case';
import { IGetCreditPort } from '../ports/out/get-credit.port';
import { ICreditParams } from '../../adapters/in/interfaces/credit-params';
import { CreditsPersistenceService } from './../../adapters/out/credits-persistence.service';
import { NotificationEmailMarketingService } from '../../../../../shared/services/app-marketing/notification-email-marketing.service';
import { IEmailToCreditAnalyst } from '../../../../../shared/interfaces/email/email-to-credit-analyst';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
require('dayjs/locale/es');
import { IGetStatusFeesPort } from '../ports/out/get-status-fees.port';
import { IEmailInformationCredit } from './../../../../../shared/interfaces/email/email-information-credit';
import { emailsSmarters } from './../../../../../shared/consts/emails';

dayjs.locale('es');
dayjs.extend(utc);

@Injectable()
export class GetCreditService implements IGetCreditUseCase {
    private getCreditPort: IGetCreditPort;
    private getStatusFeesPort: IGetStatusFeesPort;

    constructor(
        private notificationEmailService: NotificationEmailMarketingService,
        creditsPersistenceService: CreditsPersistenceService,
    ) {
        this.getCreditPort = creditsPersistenceService;
    }
    async getCreditAndSendEmail(creditParams: ICreditParams, emailReceptor?: string) {
        const credit = await this.getCreditPort.getCredit(creditParams);

        /* credit[0]['FeesCancelled'] = credit.calculateFeesCancelled();
        credit[0]['PercentageAmountPaid'] = credit.calculateFeesPaid(); */

        if (emailReceptor) {
            return this.notifyInformationCredit(credit, emailReceptor);
        } else {
            this.notifyCreditQueried(credit);
        }

        return credit;
    }
    private notifyCreditQueried(credit: any) {
        const emailToTest = emailsSmarters[0];
        console.log('-----------------the email', emailToTest);
        const emailToSend: IEmailToCreditAnalyst = {
            customer: {
                nameCustomer: credit[0].Customer,
                documentCustomer: credit[0].DocumentNumber,
                phoneCustomer: credit[0].Phone,
                emailCustomer: credit[0].Email,
            },
            credit: {
                debtCustomer: `S/ ${credit[0].AmountCredit}`,
                debtDate: '31/12/2021',
            },
            creditAnalyst: {
                nameCreditAnalyst: 'Javier Moroco',
                emailCreditAnalyst: emailToTest,
            },
            datetimeQuery: dayjs(new Date()).format('DD/MM/YYYY hh:mm:ss'),
            dateQuery: dayjs(new Date()).format('DD/MM/YYYY hh:mm:ss'),
            qualification: {
                qualification: '100% Normal',
                monthQualifiction: [
                    {
                        month: 'Junio',
                        score: '100%',
                    },
                    {
                        month: 'Julio',
                        score: '100%',
                    },
                    {
                        month: 'Agosto',
                        score: '100%',
                    },
                    {
                        month: 'Septiembre',
                        score: '100%',
                    },
                    {
                        month: 'Octubre',
                        score: '100%',
                    },
                    {
                        month: 'Noviembre',
                        score: '100%',
                    },
                ],
            },
        };

        this.notificationEmailService.sendEmailToCreditAnalyst(emailToSend);
    }

    private notifyInformationCredit(credit: any, emailReceptor: string) {
        const emailCredit: IEmailInformationCredit = {
            emailReceptor,
            customer: {
                documentNumber: credit[0].DocumentNumber,
                phone: credit[0].Phone,
                email: credit[0].Email,
            },
            credit: {
                amount: credit[0].AmountCredit,
                tea: credit[0].InterestRate,
                balance: credit[0].Balance,
                currency: credit[0].Currency,
                product: credit[0].ProductName,
                creditNumber: credit[0].CreditNumber,
                disburdedAmount: credit[0].AmountCredit,
                currencyType: credit[0].Currency,
                currentfeeAmount: credit[0].AmountCurrentFee,
                disbursementDate: dayjs(credit[0].StartDate).format('DD/MM/YYYY'),
            },
            fee: {
                numberFee: credit[0].FeesCancelled,
                amountCurrentFee: credit[0].AmountCurrentFee,
                expirationDate: dayjs(credit[0].EndDate).format('DD/MM/YYYY'),
            },
            creditAnalyst: {
                analystName: 'Juan Perez',
                phone: 963258741,
                email: 'juan@gmail.com',
            },
            agency: {
                agencyName: 'Lima',
                addressAgency: 'Jr Loreto #3434',
            },
        };
        console.log('----------emailCredit', emailCredit);
        return this.notificationEmailService.sendEmailInformationCredit(emailCredit);
    }
}

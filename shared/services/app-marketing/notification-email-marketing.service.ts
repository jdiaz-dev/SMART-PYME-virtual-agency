import { ConfigService } from '@nestjs/config';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { AuthenticationMarketingService } from './authentication-marketing.service';
import * as FormData from 'form-data';
import { IEmailToCreditAnalyst } from '../../interfaces/email/email-to-credit-analyst';
import { MessagesEmailEnum } from '../../enums/messages-email';
import { IEmailInformationCredit } from '../../interfaces/email/email-information-credit';
import { interval, lastValueFrom } from 'rxjs';
import { ErrorSendEmailEnum } from '../../enums/messages-failed-request';

@Injectable()
export class NotificationEmailMarketingService {
    private urlNotification = this.configService.get<string>('marketingApp.notification.url');
    constructor(
        private _http: HttpService,
        private configService: ConfigService,
        private authenticationMarketingServ: AuthenticationMarketingService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}
    async sendEmailToCreditAnalyst(emailToCreditAnalyst: IEmailToCreditAnalyst) {
        const templateGUID = this.configService.get<string>(
            'marketingApp.notification.templatePaymentFeeQueryGUID',
        );

        const body = new FormData();
        body.append('email', emailToCreditAnalyst.creditAnalyst.emailCreditAnalyst);
        body.append('subject', MessagesEmailEnum.PAYMENT_FEE_QUERY);
        body.append('CustomerTags[{{date}}]', emailToCreditAnalyst.datetimeQuery);
        body.append('CustomerTags[{{analyst_name}}]', emailToCreditAnalyst.creditAnalyst.nameCreditAnalyst);
        body.append('CustomerTags[{{name}}]', emailToCreditAnalyst.customer.nameCustomer);
        body.append('CustomerTags[{{document}}]', emailToCreditAnalyst.customer.documentCustomer);
        body.append('CustomerTags[{{phone_number}}]', emailToCreditAnalyst.customer.phoneCustomer);
        body.append('CustomerTags[{{email_contact}}]', emailToCreditAnalyst.customer.emailCustomer);
        body.append('CustomerTags[{{registrationDate}}]', emailToCreditAnalyst.dateQuery);
        body.append('CustomerTags[{{debt}}]', emailToCreditAnalyst.credit.debtCustomer);
        body.append('CustomerTags[{{debtDate}}]', emailToCreditAnalyst.credit.debtDate);
        body.append('CustomerTags[{{qualification}}]', emailToCreditAnalyst.qualification.qualification);
        body.append(
            'CustomerTags[{{qualificationImage}}]',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYI7YKSuqEQDp7xEVy50QL6zpmfE5wdIWQ03eDJ4kkqiNAHw8YRStczLELBsYhWAnbJEY&usqp=CAU',
        );

        const monthCollection = emailToCreditAnalyst.qualification.monthQualifiction;
        for (let x = 0; x < monthCollection.length; x++) {
            body.append(`CustomerTags[{{month_${x + 1}}}]`, monthCollection[x].month);
            body.append(`CustomerTags[{{score_${x + 1}}}]`, monthCollection[x].score);
        }
        this.sendEmail(templateGUID, body);
    }
    async sendEmailInformationCredit(emailCredit: IEmailInformationCredit) {
        const templateGUID = this.configService.get<string>(
            'marketingApp.notification.templateInformationCreditGUID',
        );

        console.log('--------------templateGUID', templateGUID);
        const body = new FormData();
        console.log('------------------------information', emailCredit);

        body.append('email', emailCredit.emailReceptor);
        body.append('subject', MessagesEmailEnum.INFORMAATION_CREDIT);

        //customer
        body.append('CustomerTags[{{customerDocumentNumber}}]', emailCredit.customer.documentNumber);
        body.append('CustomerTags[{{phoneCustomer}}]', emailCredit.customer.phone);
        body.append('CustomerTags[{{emailCustomer}}]', emailCredit.customer.email);

        //credit
        body.append('CustomerTags[{{tea}}]', emailCredit.credit.tea);
        body.append('CustomerTags[{{disbursementDate}}]', emailCredit.credit.disbursementDate);
        body.append('CustomerTags[{{product}}]', emailCredit.credit.product);
        body.append('CustomerTags[{{creditNumber}}]', emailCredit.credit.creditNumber);
        body.append('CustomerTags[{{currency}}]', emailCredit.credit.currencyType);
        body.append('CustomerTags[{{disbursedAmount}}]', `S/ ${emailCredit.credit.amount}`);
        body.append('CustomerTags[{{principalBalance}}]', `S/ ${emailCredit.credit.balance}`);

        // fee
        body.append('CustomerTags[{{feeNumber}}]', emailCredit.fee.numberFee.split('/')[0]);
        body.append('CustomerTags[{{feeTotal}}]', emailCredit.fee.numberFee.split('/')[1]);
        body.append('CustomerTags[{{expirationDate}}]', emailCredit.fee.expirationDate);
        body.append('CustomerTags[{{feeAmount}}]', `S/ ${emailCredit.fee.amountCurrentFee}`);

        //analyst
        body.append('CustomerTags[{{analystName}}]', emailCredit.creditAnalyst.analystName);
        body.append('CustomerTags[{{analystPhone}}]', emailCredit.creditAnalyst.phone);
        body.append('CustomerTags[{{analystEmail}}]', emailCredit.creditAnalyst.email);

        //agency
        body.append('CustomerTags[{{agencyName}}]', emailCredit.agency.agencyName);
        body.append('CustomerTags[{{agencyAddress}}]', emailCredit.agency.addressAgency);

        return this.sendEmail(templateGUID, body);
    }
    private async sendEmail(templateGUID: string, body: FormData): Promise<boolean> {
        let emailSend = false;
        const skipEmail = this.configService.get<boolean>('marketingApp.notification.skipSendEmail');

        if (!skipEmail) {
            const token = await this.authenticationMarketingServ.clientAppAuthentication();

            const _headers = {
                ...body.getHeaders(),
                Authorization: `Bearer ${token}`,
            };

            try {
                const response = await lastValueFrom(
                    this._http.post(`${this.urlNotification}/api/v1/email-templates/${templateGUID}`, body, {
                        headers: _headers,
                    }),
                );
                // .toPromise()
                // .catch((error) => console.log('--------------error', error));

                if (response.status == 202) emailSend = true;
            } catch (error) {
                console.log('--------------error', error.response.data);
                this.logger
                    .child({
                        class: this.toString(),
                        method: this.sendEmail.name,
                        //body,
                        _headers,
                        //error: error.response.data,
                    })
                    .error(error.response.data);
                throw new InternalServerErrorException(ErrorSendEmailEnum.EMAIL_NOT_SEND);
            }
        }
        console.log('------------------emailSend', emailSend);
        return emailSend;
    }

    private toString() {
        return AuthenticationMarketingService.name;
    }
}

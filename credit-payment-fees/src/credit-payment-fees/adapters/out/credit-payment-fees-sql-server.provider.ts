import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import { ICreditPaymentFeesRepository } from './credit-payment-fees.repository';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { ISetQueriesFees } from '../in/interfaces/set.queries-fees';
import { ISetParamsFees } from '../in/interfaces/set-params-fees';
import { ErrorMessagesFeesEnum } from '../../../../../shared/enums/messages-failed-request';
import { ISpGetDetailCreditPaymentFee } from './sp-interfaces/sp-get-detail-credit-payment-fee';

@Injectable()
export class CreditPaymentFeesSqlServerProvider implements ICreditPaymentFeesRepository {
    constructor(
        @InjectConnection(NameConnectionEnum.NAME_CONNECTION) private connection: Sequelize,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async getCreditPaymentFees(
        setParamsFees: ISetParamsFees,
        setQueriesFees: ISetQueriesFees,
    ): Promise<ISpGetDetailCreditPaymentFee[]> {
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetDetailCreditPaymentFees] 
                @CustomerGUID = $customerGUID, 
                @CreditGUID = $creditGUID,
                @StatusFeeId = $statusFeeId,
                @Size = $size`;

            const creditPaymentFees: ISpGetDetailCreditPaymentFee[] = await this.connection.query(query, {
                bind: {
                    customerGUID: setParamsFees.customerGUID,
                    creditGUID: setParamsFees.creditGUID,
                    statusFeeId: setQueriesFees.statusFeeId,
                    size: parseInt(setQueriesFees.size),
                },
                type: QueryTypes.SELECT,
                raw: true,
            });

            if (creditPaymentFees.length >= 1) {
                return creditPaymentFees;
            } else {
                throw new BadRequestException(ErrorMessagesFeesEnum.CREDIT_PAYMENT_FEE_NOT_FOUND);
            }
        } catch (error) {
            console.log('---------error', error);
            this.logger
                .child({
                    class: this.toString(),
                    action: this.getCreditPaymentFees.name,
                    ...setParamsFees,
                    ...setQueriesFees,
                })
                .error(error);

            if (error.response) {
                throw new BadRequestException(ErrorMessagesFeesEnum.CREDIT_PAYMENT_FEE_NOT_FOUND);
            }
            throw new InternalServerErrorException();
        }
    }
    toString() {
        return CreditPaymentFeesSqlServerProvider.name;
    }
}

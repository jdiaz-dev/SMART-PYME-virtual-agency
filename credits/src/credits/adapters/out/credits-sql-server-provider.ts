import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize, Transaction } from 'sequelize';
import { ICreditsRepository } from './credits.repository';
import { ErrorMesaggesEnum } from '../../../../../shared/enums/messages-failed-request';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ICreditParams } from '../in/interfaces/credit-params';
import { ISpGetDetailCredits } from './sp-interfaces/sp-get-detail-credits';
import { ISpGetDetailCredit } from './sp-interfaces/sp-get-detail-credit';

@Injectable()
export class CreditsSqlServerProvider implements ICreditsRepository {
    constructor(
        @InjectConnection(NameConnectionEnum.NAME_CONNECTION) private connection: Sequelize,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async getCredit(creditParams: ICreditParams): Promise<ISpGetDetailCredit[]> {
        try {
            const startTime = Date.now();
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetDetailCredit] 
                @CustomerGUID = $customerGUID, 
                @CreditGUID = $creditGUID`;

            const credit: any = await this.connection.query(query, {
                bind: {
                    customerGUID: creditParams.customerGUID,
                    creditGUID: creditParams.creditGUID,
                },
                type: QueryTypes.SELECT,
                raw: true,
            });
            const endTime = Date.now();
            const spTimeExecution = (endTime - startTime) / 1000;
            this.logger.child({ class: this.toString(), method: this.getCredits.name }).info(spTimeExecution);

            console.log('---------------credit persistence', credit);

            if (credit[0]) {
                return credit;
            } else {
                throw new BadRequestException(ErrorMesaggesEnum.CREDIT_NOT_FOUND);
            }
        } catch (error) {
            console.log('---------error', error);
            this.logger
                .child({ class: this.toString(), method: this.getCredit.name, ...creditParams })
                .error(error);

            if (error.response) {
                throw new BadRequestException(ErrorMesaggesEnum.CREDIT_NOT_FOUND);
            }
            throw new InternalServerErrorException();
        }
    }
    async getCredits(customerGUID: string): Promise<ISpGetDetailCredits[]> {
        try {
            const startTime = Date.now();
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetDetailCredits] 
                @CustomerGUID = $customerGUID`;

            const credits: ISpGetDetailCredits[] = await this.connection.query(query, {
                bind: {
                    customerGUID: customerGUID,
                },
                type: QueryTypes.SELECT,
                raw: true,
            });
            const endTime = Date.now();
            const spTimeExecution = (endTime - startTime) / 1000;
            this.logger.child({ class: this.toString(), method: this.getCredits.name }).info(spTimeExecution);

            console.log('-----------------credits', credits);
            if (credits[0]) {
                return credits;
            } else {
                throw new BadRequestException(ErrorMesaggesEnum.CREDITS_NOT_FOUND);
            }
        } catch (error) {
            console.log('---------error', error);
            this.logger.child({ class: this.toString(), method: this.getCredits.name, customerGUID }).error(error);

            if (error.response) {
                throw new BadRequestException(ErrorMesaggesEnum.CREDITS_NOT_FOUND);
            }
            throw new InternalServerErrorException();
        }
    }
    toString() {
        return CreditsSqlServerProvider.name;
    }
}

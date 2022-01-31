import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { ICreditsRepository } from './credits.repository';
import { ErrorMesaggesEnum } from '../../../../../shared/enums/messages-failed-request';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ICreditParams } from '../in/interfaces/credit-params';

@Injectable()
export class CreditsSqlServerService implements ICreditsRepository {
    constructor(
        @InjectConnection(NameConnectionEnum.NAME_CONNECTION) private connection: Sequelize,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async getCredit(creditParams: ICreditParams): Promise<any> {}
    async getCredits(customerGUID: string): Promise<any> {}
}

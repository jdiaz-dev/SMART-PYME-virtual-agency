import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { ICreditPaymentFeesRepository } from './credit-payment-fees.repository';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { Sequelize } from 'sequelize';
import { ISetQueriesFees } from '../in/interfaces/set.queries-fees';
import { ISetParamsFees } from '../in/interfaces/set-params-fees';

@Injectable()
export class CreditPaymentFeesSqlServerService implements ICreditPaymentFeesRepository {
    constructor(
        @InjectConnection(NameConnectionEnum.NAME_CONNECTION) private connection: Sequelize,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async getCreditPaymentFees(setParamsFees: ISetParamsFees, setQueriesFees: ISetQueriesFees): Promise<any> {}
}

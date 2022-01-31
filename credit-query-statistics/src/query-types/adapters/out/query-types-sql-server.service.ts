import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { IQueryTypesRepository } from './query-types.repository';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class QueryTypesSqlServerService implements IQueryTypesRepository {
    constructor(
        @InjectConnection(NameConnectionEnum.NAME_CONNECTION) private connection: Sequelize,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}
    async getQueryTypes() {}
    async getQueryTypesByCustomer(queries: ISetQueries) {}
}

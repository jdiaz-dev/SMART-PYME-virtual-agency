import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { QueryTypes, Sequelize } from 'sequelize';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { IQueryTypesRepository } from './query-types.repository';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ISpGetQueryTypes } from './sp-interfaces/sp-get-query-types';

@Injectable()
export class QueryTypesSqlServerProvider implements IQueryTypesRepository {
    constructor(
        @InjectConnection(NameConnectionEnum.NAME_CONNECTION) private connection: Sequelize,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}
    async getQueryTypes(): Promise<ISpGetQueryTypes[]> {
        try {
            const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spGetQueryTypes]`;

            const queryTypes: ISpGetQueryTypes[] = await this.connection.query(query, {
                type: QueryTypes.SELECT,
                raw: true,
            });

            return queryTypes;
        } catch (error) {
            console.log('---------error', error);
            this.logger.child({ class: this.toString(), method: this.getQueryTypes.name }).error(error);
            throw new InternalServerErrorException();
        }
    }
    toString() {
        return QueryTypesSqlServerProvider.name;
    }
}

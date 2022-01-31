import { Injectable } from '@nestjs/common';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { QueryTypesSqlServerService } from './query-types-sql-server.service';
import { IQueryTypesRepository } from './query-types.repository';
import { IQueryTypesRequest } from '../../application/ports/in/self-domain/get-query-types.request';

@Injectable()
export class QueryTypesPersistenceService implements IQueryTypesRequest {
    private queryTypesRepository: IQueryTypesRepository;

    constructor(queryTypesSqlServer: QueryTypesSqlServerService) {
        this.queryTypesRepository = queryTypesSqlServer;
    }
    getQueryTypes(): any {
        return this.queryTypesRepository.getQueryTypes();
    }
}

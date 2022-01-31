import { Module } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { getConnectionToken } from '@nestjs/sequelize';

import { NameConnectionEnum } from '../../../shared/enums/name-connection';
import { QueryTypesSqlServerService } from './adapters/out/query-types-sql-server.service';
import { QueryTypesPersistenceService } from './adapters/out/query-types-persistence.service';
import { QueryTypesController } from './adapters/in/query-types.controller';
import { RecordsMapperService } from '../../../shared/services/records-mapper.service';
import { QueryTypesSqlServerProvider } from './adapters/out/query-types-sql-server-provider';
import { FeeQueriesModule } from '../fee-payment-queries/fee-queries.module';
import { CustomersModule } from './../customers/customers.module';
import { MapperService } from './../shared/interfaces/services/mapper.service';
import { CustomerCreditQueriesModule } from './../customer-credit-queries/customer-credit-queries.module';

@Module({
    imports: [CustomersModule, FeeQueriesModule, CustomerCreditQueriesModule],
    providers: [
        {
            provide: QueryTypesSqlServerService,
            useClass: QueryTypesSqlServerProvider,
            inject: [getConnectionToken(NameConnectionEnum.NAME_CONNECTION)],
        },
        RecordsMapperService,
        QueryTypesPersistenceService,

        MapperService,
    ],
    exports: [QueryTypesSqlServerService],
    controllers: [QueryTypesController],
})
export class QueryTypesModule {}

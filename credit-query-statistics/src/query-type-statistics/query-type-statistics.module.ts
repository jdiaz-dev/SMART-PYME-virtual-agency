import { Module } from '@nestjs/common';
import { RecordsMapperService } from '../../../shared/services/records-mapper.service';
import { QueryTypeStatisticsController } from './adapters/in/query-type-statistics.controller';
import { QueryTypesPersistenceService } from './adapters/out/query-types-persistence.service';
import { QueryTypesSqlServerService } from './adapters/out/query-types-sql-server.service';
import { QueryTypesPercentageService } from './application/services/query-types-percentage.service';
import { QueryTypesAccountingService } from './application/services/query-types-accounting.service';
import { FeeQueriesModule } from '../fee-payment-queries/fee-queries.module';
import { CustomerCreditQueriesModule } from './../customer-credit-queries/customer-credit-queries.module';

@Module({
    imports: [FeeQueriesModule, CustomerCreditQueriesModule],
    controllers: [QueryTypeStatisticsController],
    providers: [
        QueryTypesPersistenceService,
        RecordsMapperService,
        QueryTypesSqlServerService,
        QueryTypesPercentageService,
        QueryTypesAccountingService,
    ],
})
export class QueryTypeStatisticsModule {}

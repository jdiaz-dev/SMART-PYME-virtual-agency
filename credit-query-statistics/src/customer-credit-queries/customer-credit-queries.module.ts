import { Module } from '@nestjs/common';
import { CustomerCreditQueriesSqlServerService } from './adapters/out/customer-credit-queries-sql-server.service';
import { CustomerCreditQueriesPersistenceService } from './adapters/out/customer-credit-queries-persistence.service';

@Module({
    providers: [CustomerCreditQueriesSqlServerService, CustomerCreditQueriesPersistenceService],
    exports: [CustomerCreditQueriesPersistenceService],
})
export class CustomerCreditQueriesModule {}

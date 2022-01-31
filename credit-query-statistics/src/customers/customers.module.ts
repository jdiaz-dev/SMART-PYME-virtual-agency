import { Module } from '@nestjs/common';
import { CustomersSqlServerService } from './adapters/out/customers-sql-server.service';
import { CustomersPersistenceService } from './adapters/out/customers-persistence.service';

@Module({
    providers: [CustomersSqlServerService, CustomersPersistenceService],
    exports: [CustomersPersistenceService],
})
export class CustomersModule {}

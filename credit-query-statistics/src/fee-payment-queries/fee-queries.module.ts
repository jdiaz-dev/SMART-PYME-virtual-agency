import { Module } from '@nestjs/common';
import { FeeQueriesPersistenceService } from './adapters/out/fee-queries-persistence.service';
import { FeeQueriesSqlServerService } from './adapters/out/fee-queries-sql-server.service';
import { FeeQueriesController } from './adapters/in/fee-queries.controller';
import { MapperService } from '../shared/interfaces/services/mapper.service';
import { RecordsMapperService } from '../../../shared/services/records-mapper.service';

@Module({
    providers: [MapperService, RecordsMapperService, FeeQueriesPersistenceService, FeeQueriesSqlServerService],
    exports: [FeeQueriesPersistenceService],
    controllers: [FeeQueriesController],
})
export class FeeQueriesModule {}

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { VotesSqlServerService } from './adapters/out/votes-sql-server.service';
import { VotesPersistenceService } from './adapters/out/votes-persistence.service';
import { VotesController } from './adapters/in/votes.controller';
import { VotesSqlServerProvider } from './adapters/out/votes-sql-server.provider';
import { getConnectionToken } from '@nestjs/sequelize';
import { NameConnectionEnum } from '../../../shared/enums/name-connection';
import { RecordsMapperService } from '../../../shared/services/records-mapper.service';
import { WorkStreamAuditMiddleware } from './../../../shared/middleware/work-stream-audit.middleware';
import { WorkStreamAuditService } from '../../../shared/stored-procedure/work-stream-audit.service';

@Module({
  controllers: [VotesController],
  providers: [
    {
      provide: VotesSqlServerService,
      useClass: VotesSqlServerProvider,
      inject: [getConnectionToken(NameConnectionEnum.NAME_CONNECTION)],
    },
    VotesPersistenceService,
    RecordsMapperService,
    WorkStreamAuditService,
  ],
})
export class ArticleVotesModule {
  configure(comsumer: MiddlewareConsumer) {
    comsumer
      .apply(WorkStreamAuditMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

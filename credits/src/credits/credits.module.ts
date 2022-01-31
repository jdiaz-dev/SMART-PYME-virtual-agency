import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { getConnectionToken } from '@nestjs/sequelize';
import { CreditsController } from './adapters/in/credits.controller';
import { CreditsPersistenceService } from './adapters/out/credits-persistence.service';
import { CreditsSqlServerService } from './adapters/out/credits-sql-server.service';
import { RecordsMapperService } from './../../../shared/services/records-mapper.service';
import { NameConnectionEnum } from '../../../shared/enums/name-connection';
import { WorkStreamAuditMiddleware } from './../../../shared/middleware/work-stream-audit.middleware';
import { WorkStreamAuditService } from '../../../shared/stored-procedure/work-stream-audit.service';
import { PercentageAmountPaidService } from './application/services/percentage-amount-paid.service';
import { CreditsSqlServerProvider } from './adapters/out/credits-sql-server-provider';
import { AuthenticationMarketingService } from '../../../shared/services/app-marketing/authentication-marketing.service';
import { NotificationEmailMarketingService } from './../../../shared/services/app-marketing/notification-email-marketing.service';
import { GetCreditService } from './application/services/get-credit.service';
import { NotificationsController } from './adapters/in/notifications.controller';
import { ConfigurationAppsettingsModule } from '../../../shared/configuration/configuration-appsettings/configuration-appsettings.module';
import { CreditsMapperService } from './adapters/out/credits-mapper.service';

@Module({
    imports: [HttpModule, ConfigurationAppsettingsModule],
    controllers: [CreditsController, NotificationsController],
    providers: [
        CreditsPersistenceService,
        {
            provide: CreditsSqlServerService,
            useClass: CreditsSqlServerProvider,
            inject: [getConnectionToken(NameConnectionEnum.NAME_CONNECTION)],
        },

        RecordsMapperService,
        WorkStreamAuditService,
        PercentageAmountPaidService,

        //from shared
        AuthenticationMarketingService,
        NotificationEmailMarketingService,
        GetCreditService,
        CreditsMapperService,
    ],
})
export class CreditsModule {
    configure(comsumer: MiddlewareConsumer) {
        comsumer.apply(WorkStreamAuditMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
//to test a single file : npm test fileName.spec

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CreditPaymentFeesController } from './adapters/in/credit-payment-fees.controller';
import { CreditPaymentFeesPersistenceService } from './adapters/out/credit-payment-fees-persistence.service';
import { getConnectionToken } from '@nestjs/sequelize';
import { CreditPaymentFeesSqlServerService } from './adapters/out/credit-payment-fees-sql-server.service';
import { RecordsMapperService } from '../../../shared/services/records-mapper.service';
import { CreditPaymentFeesSqlServerProvider } from './adapters/out/credit-payment-fees-sql-server.provider';
import { NameConnectionEnum } from '../../../shared/enums/name-connection';
import { CheckStatusFeeIdMiddleware } from './adapters/in/middlewares/check-status-fee-id.middleware';
import { ValidateIdMiddleware } from './../../../shared/middleware/validate-id.middleware';
import { WorkStreamAuditMiddleware } from './../../../shared/middleware/work-stream-audit.middleware';
import { WorkStreamAuditService } from '../../../shared/stored-procedure/work-stream-audit.service';
import { ConfigurationAppsettingsModule } from "../../../shared/configuration/configuration-appsettings/configuration-appsettings.module";

@Module({
    imports: [ConfigurationAppsettingsModule],
    controllers: [CreditPaymentFeesController],
    providers: [
        {
            provide: CreditPaymentFeesSqlServerService,
            useClass: CreditPaymentFeesSqlServerProvider,
            inject: [getConnectionToken(NameConnectionEnum.NAME_CONNECTION)],
        },
        CreditPaymentFeesPersistenceService,
        RecordsMapperService,
        WorkStreamAuditService,
    ],
})
export class CreditPaymentFeesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(WorkStreamAuditMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        });
        consumer
            .apply(CheckStatusFeeIdMiddleware, ValidateIdMiddleware)
            .forRoutes({
                path: 'v1/customers/:customerGUID/credits/:creditGUID/credit-payment-fees',
                method: RequestMethod.GET,
            });     
    }

}

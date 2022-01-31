import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/sequelize';

import { CustomersController } from './adapters/in/customers.controller';
import { CustomersPersistenceService } from './adapters/out/customers-persistence.service';
import { CustomersSqlServerService } from './adapters/out/customers-sql-server.service';
import { RecordsMapperService } from './../../../shared/services/records-mapper.service';
import { NameConnectionEnum } from '../../../shared/enums/name-connection';
import { CustomersSequelizeServiceProvider } from './adapters/out/customers-sequelize.provider';
import { WorkStreamAuditService } from '../../../shared/stored-procedure/work-stream-audit.service';
import { WorkStreamAuditMiddleware } from './../../../shared/middleware/work-stream-audit.middleware';
import { ConfigurationAppsettingsModule } from "../../../shared/configuration/configuration-appsettings/configuration-appsettings.module";

@Module({
    controllers: [CustomersController],
    providers: [
        {
            provide: CustomersSqlServerService,
            useClass: CustomersSequelizeServiceProvider,
            inject: [getConnectionToken(NameConnectionEnum.NAME_CONNECTION)],
        },
        CustomersPersistenceService,
        RecordsMapperService,
        WorkStreamAuditService,
    ],
    imports: [
        ConfigurationAppsettingsModule,
    ],
})
export class CustomersModule {
    configure(comsumer: MiddlewareConsumer) {
        comsumer.apply(WorkStreamAuditMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import configuration from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { QueryTypesModule } from './query-types/query-types.module';
import { NameConnectionEnum } from '../../shared/enums/name-connection';
import { WinstonModule } from 'nest-winston';
import { WinstonCofigService } from '../../shared/services/configuration/winston-config.service';
import { QueryTypeStatisticsModule } from './query-type-statistics/query-type-statistics.module';
import { FeeQueriesModule } from './fee-payment-queries/fee-queries.module';
import { CustomersModule } from './customers/customers.module';
import { MapperService } from './shared/interfaces/services/mapper.service';
import { RecordsMapperService } from '../../shared/services/records-mapper.service';
import { CustomerCreditQueriesModule } from './customer-credit-queries/customer-credit-queries.module';
import { WorkStreamAuditMiddleware } from './../../shared/middleware/work-stream-audit.middleware';
import { WorkStreamAuditService } from '../../shared/stored-procedure/work-stream-audit.service';
import { ConfigurationAppsettingsModule } from "../../shared/configuration/configuration-appsettings/configuration-appsettings.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        SequelizeModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: 'mssql',
                host: configService.get<string>('database.host', { infer: true }),
                username: configService.get<string>('database.username', { infer: true }),
                password: configService.get<string>('database.password', { infer: true }),
                database: configService.get<string>('database.database', { infer: true }),
                autoLoadModels: true,
                synchronize: true,
                ssl: false,
            }),
            name: NameConnectionEnum.NAME_CONNECTION,
        }),
        WinstonModule.forRootAsync({
            useClass: WinstonCofigService,
            inject: [ConfigService],
        }),
        QueryTypesModule,
        QueryTypeStatisticsModule,
        FeeQueriesModule,
        CustomersModule,
        CustomerCreditQueriesModule,
        ConfigurationAppsettingsModule,
    ],
    controllers: [AppController],
    providers: [AppService, RecordsMapperService, MapperService, WinstonCofigService,WorkStreamAuditService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(WorkStreamAuditMiddleware).forRoutes({
            path: '*',
            method: RequestMethod.ALL,
        });
    }
}

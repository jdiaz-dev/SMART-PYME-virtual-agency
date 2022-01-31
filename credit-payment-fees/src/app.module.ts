import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configuration';
import { CreditPaymentFeesModule } from './credit-payment-fees/credit-payment-fees.module';
import { WinstonModule } from 'nest-winston';
import { WinstonCofigService } from '../../shared/services/configuration/winston-config.service';
import { NameConnectionEnum } from '../../shared/enums/name-connection';

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
        CreditPaymentFeesModule,
    ],
    controllers: [AppController],
    providers: [AppService, ConfigService],
})
export class AppModule {}

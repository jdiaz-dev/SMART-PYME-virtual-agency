import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreditsModule } from './credits/credits.module';

import configuration from './configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { NameConnectionEnum } from '../../shared/enums/name-connection';
import { WinstonCofigService } from '../../shared/services/configuration/winston-config.service';
import { WinstonModule } from 'nest-winston';

@Module({
    imports: [
        CreditsModule,
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
    ],
    controllers: [AppController],
    providers: [AppService, WinstonCofigService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { NameConnectionEnum } from '../../shared/enums/name-connection';
import { WinstonModule } from 'nest-winston';
import { WinstonCofigService } from '../../shared/services/configuration/winston-config.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),

        SequelizeModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    dialect: 'mssql',
                    host: configService.get<string>('database.host'),
                    username: configService.get<string>('database.username'),
                    password: configService.get<string>('database.password'),
                    database: configService.get<string>('database.database'),
                    autoLoadModels: true,
                    synchronize: true,
                    ssl: false,
                };
            },
            name: NameConnectionEnum.NAME_CONNECTION,
        }),
        WinstonModule.forRootAsync({
            useClass: WinstonCofigService,
            inject: [ConfigService],
        }),
        CustomersModule,
    ],
    controllers: [AppController],
    providers: [AppService, WinstonCofigService],
})
export class AppModule {}

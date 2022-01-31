import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleVotesModule } from './votes/article-votes.module';
import { WinstonCofigService } from '../../shared/services/configuration/winston-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { SequelizeModule } from '@nestjs/sequelize';
import { NameConnectionEnum } from '../../shared/enums/name-connection';
import { ConfigurationAppsettingsModule } from "../../shared/configuration/configuration-appsettings/configuration-appsettings.module";
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
    ArticleVotesModule,
    ConfigurationAppsettingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

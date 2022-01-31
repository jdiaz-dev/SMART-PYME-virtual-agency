import { ConfigService } from '@nestjs/config';
import { LoggerOptions } from 'winston';
import { winstonAzureBlob } from 'winston-azure-blob';
import { format, transports } from 'winston';
import { Injectable } from '@nestjs/common';
import { WinstonModuleOptionsFactory } from 'nest-winston';
import { LEVEL_LOGS } from '../../consts/level-logs';

@Injectable()
export class WinstonCofigService implements WinstonModuleOptionsFactory {
    constructor(private configService: ConfigService) {}

    async createWinstonModuleOptions(): Promise<LoggerOptions> {
        const errorBlob = this.configService.get<string>('logger.errorBlob'),
            exceptionBlob = this.configService.get<string>('logger.exceptionBlob');
        return {
            levels: LEVEL_LOGS,
            format: format.combine(format.timestamp(), format.json()),
            transports: this.obtainErrorBlob(errorBlob),
            exceptionHandlers: this.obtainExceptionBlob(exceptionBlob),
        };
    }
    private obtainErrorBlob(_errorBlob: string) {
        let erroBlob;

        if (process.env.APP_ENV === 'local') {
            erroBlob = [new transports.File({ filename: _errorBlob })];
        } else {
            erroBlob = [
                winstonAzureBlob({
                    account: {
                        name: this.configService.get<string>('logger.nameAzureStorage'),
                        key: this.configService.get<string>('logger.keyAzureStorage'),
                    },
                    containerName: this.configService.get<string>('logger.containerName'),
                    blobName: _errorBlob,
                    rotatePeriod: 'YYYY-MM-DD',
                }),
            ];
        }
        return erroBlob;
    }

    private obtainExceptionBlob(_exceptionBlob: string) {
        let exceptionBlob;

        if (process.env.APP_ENV === 'local') {
            exceptionBlob = [new transports.File({ filename: _exceptionBlob })];
        } else {
            exceptionBlob = [
                winstonAzureBlob({
                    account: {
                        name: this.configService.get<string>('logger.nameAzureStorage'),
                        key: this.configService.get<string>('logger.keyAzureStorage'),
                    },
                    containerName: this.configService.get<string>('logger.containerName'),
                    blobName: _exceptionBlob,
                    rotatePeriod: 'YYYY-MM-DD',
                }),
            ];
        }
        return exceptionBlob;
    }
}

import { ConfigService } from '@nestjs/config';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ErrorSendEmailEnum } from '../../enums/messages-failed-request';

@Injectable()
export class AuthenticationMarketingService {
    private urlAuthentication = this.configService.get<string>('marketingApp.authentication.url');
    constructor(
        private _http: HttpService,
        private configService: ConfigService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async clientAppAuthentication() {
        const body = {};
        const headers = {
            clientId: this.configService.get<string>('marketingApp.authentication.clientId'),
            clientSecret: this.configService.get<string>('marketingApp.authentication.clientSecret'),
        };
        try {
            const response = await this._http
                .post(`${this.urlAuthentication}/api/v1/token`, body, { headers })
                .toPromise();

            console.log('------------------response.data', response.data);
            return response.data.token;
        } catch (error) {
            console.log('------------error', error.response.data);
            this.logger
                .child({ class: this.toString(), method: this.clientAppAuthentication.name, headers })
                .error(error.response.data);
            throw new InternalServerErrorException(ErrorSendEmailEnum.EMAIL_NOT_SEND);
        }
    }
    private toString() {
        return AuthenticationMarketingService.name;
    }
}

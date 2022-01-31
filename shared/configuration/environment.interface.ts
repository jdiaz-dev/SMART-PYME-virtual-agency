export interface IWinstonLogger {
    nameAzureStorage: string;
    keyAzureStorage: string;
    containerName: string;
    errorBlob: string;
    exceptionBlob: string;
}
interface IDatabase {
    database: string;
    username: string;
    password: string;
    host: string;
}
export interface IMarketingApp {
    authentication: {
        clientId: string;
        clientSecret: string;
        url: string;
    };
    notification: {
        url: string;
        templatePaymentFeeQueryGUID: string;
        templateInformationCreditGUID: string;
        skipSendEmail: boolean;
    };
}

export interface IEnvironment {
    database: IDatabase;
    logger: IWinstonLogger;
    marketingApp: IMarketingApp;
}

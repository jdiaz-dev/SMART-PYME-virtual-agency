import { MARKETING_APP } from './api-marketing/api-marketing';
import { IEnvironment } from './environment.interface';
import { WINSTON_LOGGER } from './logger/logger';

export const production: IEnvironment = {
    logger: WINSTON_LOGGER,
    database: {
        database: process.env.SQL_SERVER_DATABASE,
        username: process.env.SQL_SERVER_USERNAME,
        password: process.env.SQL_SERVER_PASSWORD,
        host: process.env.SQL_SERVER_HOST,
    },
    marketingApp: MARKETING_APP,
};

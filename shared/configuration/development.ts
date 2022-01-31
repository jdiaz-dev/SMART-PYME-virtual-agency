import { IEnvironment } from './environment.interface';
import { WINSTON_LOGGER } from './logger/logger';
import { MARKETING_APP } from './api-marketing/api-marketing';

export const development: IEnvironment = {
    logger: WINSTON_LOGGER,
    database: {
        database: process.env.SQL_SERVER_DATABASE || 'smartpyme-enterprise-dev-database',
        username: process.env.SQL_SERVER_USERNAME || 'developers',
        password: process.env.SQL_SERVER_PASSWORD || 'UBtRzXbgW@QFR8zZ',
        host: process.env.SQL_SERVER_HOST || 'smartpyme-dev.database.windows.net',
    },
    marketingApp: MARKETING_APP,
};

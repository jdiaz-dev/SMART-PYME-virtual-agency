import { MARKETING_APP } from './api-marketing/api-marketing';
import { IEnvironment } from './environment.interface';
import { WINSTON_LOGGER } from './logger/logger';
import * as Os from 'os';
const name = Os.hostname();
let database;
const credentials = {
    'LAPTOP-3J5630HQ': {
        database: 'smartpyme_local',
        username: 'jhonntan',
        password: 'abogato77',
        host: 'localhost',
    },
    'DESKTOP-MR5JL7M': {
        database: 'learning-store-procedures',
        username: 'sqlserver',
        password: 'ironman26',
        host: 'localhost',
    },
    //add credencial
};
for (const property in credentials) {
    if (property === name) {
        database = credentials[property];
    }
}

export const local: IEnvironment = {
    logger: WINSTON_LOGGER,
    database,
    marketingApp: MARKETING_APP,
};

import { local } from './local';
import { development } from './development';
import { production } from './producttion';


const availableEnvironments = {
    local,
    development,
    production,
};

const globalConfiguration = (environment: string = 'production') => {
    console.log('----------environment', environment);
    return availableEnvironments[environment];
};

export default globalConfiguration;

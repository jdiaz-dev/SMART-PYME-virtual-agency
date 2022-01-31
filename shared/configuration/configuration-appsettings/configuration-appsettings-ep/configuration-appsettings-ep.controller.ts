import { Controller, Get } from '@nestjs/common';

@Controller()
export class ConfigurationAppsettingsEpController {
    @Get("/configuration-appsettings")
    async configuration_appsettings() {
        let env_copy = {}
        let our_env_key=[
            'NODE_ENV',
            'APP_ENV',
            'SQL_SERVER_HOST',
            'SQL_SERVER_USERNAME',
            'SQL_SERVER_PASSWORD',
            'SQL_SERVER_DATABASE',
            'PORT',
            'ACCOUNT_AZURE_STORAGE',
            'ACCOUNT_KEY_AZURE_STORAGE',
            'CONTAINER_LOGS',
            'ERROR_BLOB',
            'EXCEPTION_BLOB',
            'CLIENT_ID',
            'CLIENT_SECRET',
            'API_MARKETING_AUTHENTICATION',
            'API_MARKETING_NOTIFICATION',
            'TEMPLATE_PAYMENT_FEE_QUERY_GUID',
            'TEMPLATE_INFORMATION_CREDIT_GUID',
            'SKIP_SEND_EMAIL',
        ]
        our_env_key.forEach(key => {
            if(process.env[key]){
                env_copy[key] = process.env[key];
            }
        });

        Object.keys(env_copy).forEach(key => {
            if(key.includes("KEY") || key.includes("SECRET") || key.includes("PASSWORD") || key.includes("TOKEN")) {
                env_copy[key]=env_copy[key].replace(/[a-zA-Z0-9]/g, "*");
            }
        });        
        return {"env": env_copy};
    }
}

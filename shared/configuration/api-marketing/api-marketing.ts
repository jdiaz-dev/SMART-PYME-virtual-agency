import { IMarketingApp } from '../environment.interface';

const skipSendEmailToBoolean = (): boolean => {
    const variable = process.env.SKIP_SEND_EMAIL;

    if (variable == 'true') return true;
    return false;
};

export const MARKETING_APP: IMarketingApp = {
    authentication: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        url: process.env.API_MARKETING_AUTHENTICATION,
    },
    notification: {
        url: process.env.API_MARKETING_NOTIFICATION,
        templatePaymentFeeQueryGUID: process.env.TEMPLATE_PAYMENT_FEE_QUERY_GUID,
        templateInformationCreditGUID: process.env.TEMPLATE_INFORMATION_CREDIT_GUID,
        skipSendEmail: skipSendEmailToBoolean(),
    },
};

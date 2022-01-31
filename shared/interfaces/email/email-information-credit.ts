interface IDataCustomer {
    documentNumber: string;
    phone: number;
    email: string;
}

interface IFee {
    numberFee: string;
    amountCurrentFee: string;
    expirationDate: string;
}

interface IDataCredit {
    amount: string;
    tea: number;
    balance: string;
    currency: string;
    product: string;
    creditNumber: string;
    disburdedAmount: string;
    disbursementDate: string;
    currencyType: string;
    currentfeeAmount: number;
}

interface IDataCreditAnalyst {
    analystName: string;
    phone: number;
    email: string;
}

interface IDataAgency {
    agencyName: string;
    addressAgency: string;
}

export interface IEmailInformationCredit {
    emailReceptor: string;
    customer: IDataCustomer;
    credit: IDataCredit;
    fee: IFee;
    creditAnalyst: IDataCreditAnalyst;
    agency: IDataAgency;
}

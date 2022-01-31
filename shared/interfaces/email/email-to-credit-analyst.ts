interface IQualification {
    qualification: string;
    monthQualifiction: { month: string; score: string }[];
}

interface ICustomer {
    nameCustomer: string;
    documentCustomer: number;
    phoneCustomer: number;
    emailCustomer: string;
}
interface ICreditAnalyst {
    nameCreditAnalyst: string;
    emailCreditAnalyst: string;
}

interface ICredit {
    debtCustomer: string;
    debtDate: string;
}

export interface IEmailToCreditAnalyst {
    customer: ICustomer;
    creditAnalyst: ICreditAnalyst;
    credit: ICredit;
    datetimeQuery: string;
    dateQuery: string;
    qualification: IQualification;
}

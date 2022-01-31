import { ICreditParams } from 'src/credits/adapters/in/interfaces/credit-params';

export interface IGetCreditUseCase {
    getCreditAndSendEmail(creditParam: ICreditParams, emailReceptor?: string): any;
}

import { Injectable } from '@nestjs/common';
import { IOperationTypeByDateQueries } from 'src/shared/interfaces/operation-type-by-date-queries';
import { IQueryTypesAccountingUseCase } from '../ports/in/query-types-accounting-use-case';
import { NameQueryTypes } from '../../../shared/enums/name-query-types';

import { QueryTypesPersistenceService } from '../../adapters/out/query-types-persistence.service';
import { IGetQueryFeeAndCustomersAccounting } from '../ports/out/self-domain/get-customer-and-fee-query';

@Injectable()
export class QueryTypesAccountingService implements IQueryTypesAccountingUseCase {
    private getCustomerAndFeeCounted: IGetQueryFeeAndCustomersAccounting;

    constructor(customerAndFeeCounted: QueryTypesPersistenceService) {
        this.getCustomerAndFeeCounted = customerAndFeeCounted;
    }
    async queryTypesAccounting(operationTypeQueries: IOperationTypeByDateQueries) {
        const CustomerAndFeeCounted = await this.getCustomerAndFeeCounted.getQueryFeeAndCustomersAccounting(
            operationTypeQueries,
        );

        return [
            {
                queryType: NameQueryTypes.FEE_QUERY,
                total: CustomerAndFeeCounted[0]['FeePaymentQueryCount'],
            },
            {
                queryType: NameQueryTypes.CUSTOMER_CREDIT_QUERY,
                total: CustomerAndFeeCounted[0]['CustomerCreditQueryCount'],
            },
        ];
    }
}

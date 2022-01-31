import { Injectable } from '@nestjs/common';
import { ISaveCustomerCreditQueryFromQueryTypesRequest } from 'src/query-types/application/ports/in/other-domain/save-customer-credit-query-from-query-type.request';
import { SaveTypeQueryDto } from '../../../query-types/adapters/in/dtos/save-query-type-by-customer.dto';
import { CustomerCreditQueriesSqlServerService } from './customer-credit-queries-sql-server.service';
import { ICustomerCreditQueriesRepository } from './customer-credit-queries.repository';
import { IGetCustomerCreditQueriesCountedFromQueryTypeStatisticsPort } from '../../../query-type-statistics/application/ports/out/other-domains/get-customer-credit-query-from-query-type-statistics.port';
import { IOperationTypeByDateQueries } from '../../../shared/interfaces/operation-type-by-date-queries';
import { IRowsCounted } from '../../../shared/interfaces/stored-procedures/rows-counted';

@Injectable()
export class CustomerCreditQueriesPersistenceService
    implements
        ISaveCustomerCreditQueryFromQueryTypesRequest,
        IGetCustomerCreditQueriesCountedFromQueryTypeStatisticsPort
{
    private customerCreditQueriesRepository: ICustomerCreditQueriesRepository;

    constructor(customerCreditQueriesSqlServer: CustomerCreditQueriesSqlServerService) {
        this.customerCreditQueriesRepository = customerCreditQueriesSqlServer;
    }

    saveCustomerCreditQuery(saveTypeQueryDto: SaveTypeQueryDto) {
        this.customerCreditQueriesRepository.saveCustomerCreditQuery(saveTypeQueryDto);
    }
    getCustomerCreditQueriesCounted(
        operationTypeByDateQueries: IOperationTypeByDateQueries,
    ): Promise<IRowsCounted[]> {
        return this.customerCreditQueriesRepository.getCustomerCreditQueriesCounted(operationTypeByDateQueries);
    }
}

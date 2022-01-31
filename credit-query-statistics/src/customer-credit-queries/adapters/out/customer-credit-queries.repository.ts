import { SaveTypeQueryDto } from '../../../query-types/adapters/in/dtos/save-query-type-by-customer.dto';
import { IOperationTypeByDateQueries } from '../../../shared/interfaces/operation-type-by-date-queries';
import { IRowsCounted } from '../../../shared/interfaces/stored-procedures/rows-counted';

export interface ICustomerCreditQueriesRepository {
    saveCustomerCreditQuery(saveTypeQueryDto: SaveTypeQueryDto): Promise<IRowsCounted[]>;
    getCustomerCreditQueriesCounted(operationTypeByDateQueries: IOperationTypeByDateQueries);
}

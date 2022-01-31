import { SaveTypeQueryDto } from 'src/query-types/adapters/in/dtos/save-query-type-by-customer.dto';
import { IOperationTypeByDateQueries } from 'src/shared/interfaces/operation-type-by-date-queries';
import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { ISpGetFeeQueries } from './sp-interfaces/sp-get-fee-queries';
import { IRowsCounted } from '../../../shared/interfaces/stored-procedures/rows-counted';

export interface IFeeQueriesRepository {
    saveFeeQuery(saveTypeQueryDto: SaveTypeQueryDto): any;
    getFeePaymentQueries(queries: ISetQueries): Promise<ISpGetFeeQueries[]>;
    getFeePaymentQueriesCounted(operationTypeByDateQueries: IOperationTypeByDateQueries): Promise<IRowsCounted[]>;
}

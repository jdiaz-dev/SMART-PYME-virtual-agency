import { ISetQueries } from '../../../../../../shared/interfaces/queries.interface';
import { ISpGetFeeQueries } from '../../../adapters/out/sp-interfaces/sp-get-fee-queries';

export interface IGetFeeQueriesRequest {
    getFeeQueries(queries: ISetQueries): Promise<ISpGetFeeQueries[]>;
}

import { ISetQueries } from '../../../../../shared/interfaces/queries.interface';
import { SaveTypeQueryDto } from '../in/dtos/save-query-type-by-customer.dto';
import { ISpGetQueryTypes } from './sp-interfaces/sp-get-query-types';

export interface IQueryTypesRepository {
    getQueryTypes(): Promise<ISpGetQueryTypes[]>;
}

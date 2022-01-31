import { SaveTypeQueryDto } from './../../../../adapters/in/dtos/save-query-type-by-customer.dto';

export interface ISaveCustomerCreditQueryFromQueryTypesRequest {
    saveCustomerCreditQuery(saveTypeQueryDto: SaveTypeQueryDto);
}

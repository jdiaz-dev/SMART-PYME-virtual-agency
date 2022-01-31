import { SaveTypeQueryDto } from 'src/query-types/adapters/in/dtos/save-query-type-by-customer.dto';

export interface ISaveFeeQueryTypeFromQueryTypesRequest {
    saveFeeQuery(saveTypeQueryDto: SaveTypeQueryDto): void;
}

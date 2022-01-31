import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BasicResponse } from '../../../../../../shared/interceptors/base-response.interceptor';

export class QueryTypes {
    @ApiProperty()
    queryTypeId: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    state: boolean;
}
export class QueryTypesResponse extends OmitType(BasicResponse, ['data'] as const) {
    @ApiProperty({ type: [QueryTypes] })
    data: QueryTypes[];
}

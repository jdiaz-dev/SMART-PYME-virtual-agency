import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BasicResponse } from '../../../../../../shared/interceptors/base-response.interceptor';

class QueryTypeByCustomer {
    @ApiProperty()
    customerType: string;

    @ApiProperty()
    total: number;
}

export class QueryTypesByCustomerResponse extends OmitType(BasicResponse, ['data'] as const) {
    @ApiProperty({ type: [QueryTypeByCustomer] })
    data: QueryTypeByCustomer[];
}

import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BasicResponse } from '../../../../../../shared/interceptors/base-response.interceptor';

class OperationTypeAccounting {
    @ApiProperty()
    queryType: string;

    @ApiProperty()
    total: number;
}

export class OperationTypesResponse extends OmitType(BasicResponse, ['data'] as const) {
    @ApiProperty({ type: [OperationTypeAccounting] })
    data: OperationTypeAccounting;
}

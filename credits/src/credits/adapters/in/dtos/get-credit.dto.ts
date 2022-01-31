import { Credit } from './get-credits.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BasicResponse } from '../../../../../../shared/interceptors/base-response.interceptor';

export class CreditResponse extends OmitType(BasicResponse, ['data'] as const) {
    @ApiProperty({ type: Credit })
    data: Credit;
}

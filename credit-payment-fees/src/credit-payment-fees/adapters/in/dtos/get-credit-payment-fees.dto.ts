import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BasicResponse } from './../../../../../../shared/interceptors/base-response.interceptor';

export class CreditPaymentFee {
    @ApiProperty()
    creditPaymentFeeGUID: string;

    @ApiProperty()
    creditId: string;

    @ApiProperty()
    amount: string;

    @ApiProperty()
    expiryDate: string;

    @ApiProperty()
    status: string;
}

export class CreditPaymentFeesResponse extends OmitType(BasicResponse, ['data'] as const) {
    @ApiProperty({ type: [CreditPaymentFee] })
    data: CreditPaymentFee;
}

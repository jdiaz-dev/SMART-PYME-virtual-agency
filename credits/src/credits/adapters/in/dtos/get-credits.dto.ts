import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BasicResponse } from './../../../../../../shared/interceptors/base-response.interceptor';
import { Pagination } from '../../../../../../shared/classes/pagination';

export class Credit {
    @ApiProperty()
    creditGUID: string;

    @ApiProperty()
    creditNumber: string;

    @ApiProperty()
    productName: string;

    @ApiProperty()
    amountCredit: string;

    @ApiProperty()
    balance: number;

    @ApiProperty()
    endDate: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    totalFeesPaid: number;

    @ApiProperty()
    totalFeesDefeated: number;

    @ApiProperty()
    feesPaid: string;

    @ApiProperty()
    percentageAmountPaid: string;
}

export class CreditsResponse extends OmitType(BasicResponse, ['data'] as const) {
    @ApiProperty({ type: [Credit] })
    data: Credit[];
}

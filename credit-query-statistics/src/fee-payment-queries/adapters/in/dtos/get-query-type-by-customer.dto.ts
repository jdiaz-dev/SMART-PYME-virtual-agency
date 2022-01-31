import { ApiProperty } from '@nestjs/swagger';
import { Pagination } from '../../../../../../shared/classes/pagination';

export class FeeQuery {
    @ApiProperty()
    customerGUID: string;

    @ApiProperty()
    customer: string;

    @ApiProperty()
    documentNumber: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    userType: string;

    @ApiProperty()
    operatingSystem: string;

    @ApiProperty()
    device: string;

    @ApiProperty()
    modelDevice: string;

    @ApiProperty()
    requestIp: string;

    @ApiProperty()
    date: string;

    @ApiProperty()
    queryType: string;
}

export class FeeQueryResponse extends Pagination<FeeQuery> {
    @ApiProperty({ type: [FeeQuery] })
    results: FeeQuery[];
}

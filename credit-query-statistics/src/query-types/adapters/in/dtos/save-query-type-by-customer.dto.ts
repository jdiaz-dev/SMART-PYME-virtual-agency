import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BasicResponse } from '../../../../../../shared/interceptors/base-response.interceptor';

export class SaveQueryTypeByCustomerDto {
    @ApiProperty()
    customerId: string;

    @ApiProperty()
    creditId: string;
}
export class SaveQueryTypeResponse extends OmitType(BasicResponse, ['data'] as const) {
    @ApiProperty({ type: SaveQueryTypeByCustomerDto })
    data: SaveQueryTypeByCustomerDto;
}

export class SaveTypeQueryDto {
    constructor(
        public operatingSystem: string,
        public device: string,
        public modelDevice: string,
        public requestIp: string,
        public customerId?: number,
        public creditId?: number,
    ) {}
}

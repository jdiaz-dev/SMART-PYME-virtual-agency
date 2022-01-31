import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BasicResponse } from '../../../../../../shared/interceptors/base-response.interceptor';

class OperationTypesByDevice {
    @ApiProperty()
    device: string;

    @ApiProperty()
    total: number;
}

export class OperationTypesByDeviceResponse extends OmitType(BasicResponse, ['data'] as const) {
    @ApiProperty({ type: [OperationTypesByDevice] })
    data: OperationTypesByDevice[];
}

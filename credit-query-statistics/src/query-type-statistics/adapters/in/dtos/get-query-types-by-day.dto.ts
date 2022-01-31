import { ApiProperty, OmitType } from '@nestjs/swagger';
import { BasicResponse } from '../../../../../../shared/interceptors/base-response.interceptor';

class QueryTypesByDay {
    @ApiProperty()
    queryType: string;

    @ApiProperty()
    date: string;

    @ApiProperty()
    total: number;
}

export class OperationTypesByDayResponse extends OmitType(BasicResponse, ['data'] as const) {
    @ApiProperty({ type: [QueryTypesByDay] })
    data: QueryTypesByDay[];
}

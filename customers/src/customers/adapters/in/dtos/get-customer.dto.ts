import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsString,IsNotEmpty,MinLength,MaxLength } from 'class-validator';
import { BasicResponse } from './../../../../../../shared/interceptors/base-response.interceptor';

//body
export class GetCustomerDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    documentNumber: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    phone: string;
}

//response
export class CustomerDto {
    @ApiProperty()
    customerGUID: string;

    @ApiProperty()
    customerCode: string;

    @ApiProperty()
    customer: string;

    @ApiProperty()
    documentType: string;

    @ApiProperty()
    documentNumber: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    gender: string;

    @ApiProperty()
    agency: string;

    @ApiProperty()
    createdBy: string;

    @ApiProperty()
    createdAt: string;
}

export class CustomerResponse extends OmitType(BasicResponse, ['data'] as const) {
    @ApiProperty({ type: CustomerDto })
    data: CustomerDto;
}

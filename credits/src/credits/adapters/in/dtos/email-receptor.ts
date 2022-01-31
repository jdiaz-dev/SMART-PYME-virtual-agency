import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailReceptorDto {
    @ApiProperty()
    @IsEmail()
    emailReceptor: string;
}

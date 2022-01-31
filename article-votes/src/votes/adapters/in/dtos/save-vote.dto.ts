import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { BasicResponse } from './../../../../../../shared/interceptors/base-response.interceptor';

export class SaveVoteDto {
  @ApiProperty()
  @IsNumber()
  usefull: number;
}

class Vote {
  @ApiProperty()
  usefull: boolean;
}

export class VoteResponse extends OmitType(BasicResponse, ['data'] as const) {
  @ApiProperty({ type: Vote })
  data: Vote;
}

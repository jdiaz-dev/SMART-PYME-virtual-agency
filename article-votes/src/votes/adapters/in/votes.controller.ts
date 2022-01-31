import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ISaveVoteRequest } from './../../application/in/save-vote.request';
import { VotesPersistenceService } from './../out/votes-persistence.service';
import { RecordsMapperService } from '../../../../../shared/services/records-mapper.service';
import { SaveVoteDto, VoteResponse } from './dtos/save-vote.dto';
import { BaseResponseInterceptor } from '../../../../../shared/interceptors/base-response.interceptor';
import { BodyVotePipe } from './pipes/body-vote.pipe';

const entity = 'votes';
@ApiTags(entity)
@Controller({
  path: entity,
  version: '1',
})
@UseInterceptors(BaseResponseInterceptor)
export class VotesController {
  private saveVoteRequest: ISaveVoteRequest;

  constructor(
    public recordsMapperService: RecordsMapperService,
    votesPersistence: VotesPersistenceService,
  ) {
    this.saveVoteRequest = votesPersistence;
  }

  @Post()
  @ApiOkResponse({ type: VoteResponse })
  async saveRequest(@Body(new BodyVotePipe()) saveVoteDto: SaveVoteDto) {
    const vote = await this.saveVoteRequest.saveVote(saveVoteDto);
    console.log(vote);
    return this.recordsMapperService.mapUniqueRecord(vote[0]);
  }
}

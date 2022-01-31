import { Injectable } from '@nestjs/common';
import { ISaveVoteRequest } from 'src/votes/application/in/save-vote.request';
import { SaveVoteDto } from '../in/dtos/save-vote.dto';
import { ISpInsertArticleVote } from './sp-interfaces/sp-insert-article-vote';
import { VotesSqlServerService } from './votes-sql-server.service';
import { IVotesRepository } from './votes.repository';

@Injectable()
export class VotesPersistenceService implements ISaveVoteRequest {
  private votesRepository: IVotesRepository;
  constructor(votesSqlServerService: VotesSqlServerService) {
    this.votesRepository = votesSqlServerService;
  }
  async saveVote(saveVoteDto: SaveVoteDto): Promise<[ISpInsertArticleVote[]]> {
    return this.votesRepository.saveVote(saveVoteDto);
  }
}

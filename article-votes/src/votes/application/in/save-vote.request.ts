import { ISpInsertArticleVote } from 'src/votes/adapters/out/sp-interfaces/sp-insert-article-vote';
import { SaveVoteDto } from './../../adapters/in/dtos/save-vote.dto';

export interface ISaveVoteRequest {
  saveVote(SaveVoteDto: SaveVoteDto): Promise<[ISpInsertArticleVote[]]>;
}

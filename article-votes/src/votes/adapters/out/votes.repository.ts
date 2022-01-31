import { SaveVoteDto } from '../in/dtos/save-vote.dto';
import { ISpInsertArticleVote } from './sp-interfaces/sp-insert-article-vote';

export interface IVotesRepository {
  saveVote(saveVoteDto: SaveVoteDto): Promise<[ISpInsertArticleVote[]]>;
}

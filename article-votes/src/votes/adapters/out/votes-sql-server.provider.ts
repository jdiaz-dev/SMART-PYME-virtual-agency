import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { SaveVoteDto } from '../in/dtos/save-vote.dto';
import { IVotesRepository } from './votes.repository';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { Sequelize, QueryTypes } from 'sequelize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ISpInsertArticleVote } from './sp-interfaces/sp-insert-article-vote';

export class VotesSqlServerProvider implements IVotesRepository {
  constructor(
    @InjectConnection(NameConnectionEnum.NAME_CONNECTION)
    private connection: Sequelize,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  async saveVote(saveVoteDto: SaveVoteDto): Promise<[ISpInsertArticleVote[]]> {
    try {
      const query = `EXECUTE [${NameConnectionEnum.SCHEMA}].[spInsertArticleVote] 
          @Usefull = $usefull`;

      const vote: [ISpInsertArticleVote[]] | any = await this.connection.query(
        query,
        {
          bind: {
            usefull: saveVoteDto.usefull,
          },
          type: QueryTypes.INSERT,
          raw: true,
        },
      );
      console.log('-----------------vote', vote);
      return vote;
    } catch (error) {
      console.log('---------error', error);
      this.logger
        .child({
          class: this.toString(),
          action: this.saveVote.name,
          ...saveVoteDto,
        })
        .error(error);
      throw new InternalServerErrorException();
    }
  }
  toString() {
    return VotesSqlServerProvider.name;
  }
}

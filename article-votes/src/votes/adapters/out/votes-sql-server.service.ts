import { Inject, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { SaveVoteDto } from '../in/dtos/save-vote.dto';
import { IVotesRepository } from './votes.repository';
import { NameConnectionEnum } from '../../../../../shared/enums/name-connection';
import { Sequelize } from 'sequelize';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class VotesSqlServerService implements IVotesRepository {
  constructor(
    @InjectConnection(NameConnectionEnum.NAME_CONNECTION)
    private connection: Sequelize,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  async saveVote(saveVoteDto: SaveVoteDto): Promise<any> {}
}

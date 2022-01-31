import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SaveVoteDto } from '../dtos/save-vote.dto';

@Injectable()
export class BodyVotePipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const bodyVote: SaveVoteDto = plainToClass(metatype, value);
    await this.checkIfIsBoolean(bodyVote);

    return value;
  }
  async checkIfIsBoolean(bodyVote: SaveVoteDto) {
    const booleanValues = [1, 0];
    if (!booleanValues.includes(bodyVote.usefull)) {
      throw new BadRequestException();
    }
  }
}

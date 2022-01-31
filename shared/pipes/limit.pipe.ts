import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class LimitPipe implements PipeTransform {
    async transform(limit: number) {
        const maxLimit = 30;

        if (limit > 30) return maxLimit;
        return limit;
    }
}

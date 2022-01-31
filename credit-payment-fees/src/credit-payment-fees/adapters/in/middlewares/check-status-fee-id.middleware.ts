import { Injectable, NestMiddleware, Logger, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { STATTUS_FEE_IDS } from '../../../../../../shared/consts/status-fee-ids';
import { ErrorMessagesFeesEnum } from '../../../../../../shared/enums/messages-failed-request';

@Injectable()
export class CheckStatusFeeIdMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const statusFeeId = req.query.statusFeeId;
        if (statusFeeId) this.checkStatusFeeId(statusFeeId);
        next();
    }
    checkStatusFeeId(statusFeeId: string | any) {
        if (!STATTUS_FEE_IDS.includes(parseInt(statusFeeId))) {
            throw new BadRequestException(ErrorMessagesFeesEnum.STATUS_FEE_ID_INVALID);
        }
    }
}

import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { WorkStreamRequest } from '../classes/work-stream-request';
import * as requestIp from 'request-ip';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
import { WorkStreamResponse } from '../classes/tracking-response-server';
import { WorkStreamAuditService } from '../stored-procedure/work-stream-audit.service';

@Injectable()
export class WorkStreamAuditMiddleware implements NestMiddleware {
    constructor(private readonly workStreamAuditService: WorkStreamAuditService) {}

    async use(req: Request | any, res: Response, next: NextFunction) {
        const requestTracked = this.trackRequest(req);
        const workStreamAuditId = await this.workStreamAuditService.insertWorkStreamAudit(requestTracked);
        console.log('--------------------workStreamAuditId', workStreamAuditId);
        this.trackResponse(workStreamAuditId[0].WorkStreamAuditId, res);

        next();
    }
    trackRequest(req: Request) {
        const clientIp = requestIp.getClientIp(req);
        const trackingRequest = new WorkStreamRequest(
            req.url,
            req.headers.host,
            req.headers.origin,
            JSON.stringify({
                body: req.body,
                /* headers: {
                    RecaptchaToken: req.headers['recaptchatoken'],
                }, */
            }),
            dayjs().locale('es').utc(true).format(),
            req.headers['user-agent'],
            clientIp,
        );
        return trackingRequest;
    }
    trackResponse(workStreamAuditId: number, res: Response) {
        res.on('finish', () => {
            const trackingResponse = new WorkStreamResponse(
                JSON.stringify({ status: res.statusCode, statusMessage: res.statusMessage }),
                dayjs().locale('es').utc(true).format(),
            );
            this.workStreamAuditService.updateWorkStreamAudit(workStreamAuditId, trackingResponse);
        });
    }
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidateIdMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const paramContainsId = req.params;

        console.log('-------------------paramContainsId', paramContainsId);
        next();
    }
    verifyIdNumeric(id: string) {}
}

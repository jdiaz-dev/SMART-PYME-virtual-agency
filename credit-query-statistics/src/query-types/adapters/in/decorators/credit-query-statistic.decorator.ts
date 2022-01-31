import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import * as requestIp from 'request-ip';
import { ITypeQuery } from '../interfaces/credit-query-statistic';
import { ErrorMesaggesEnum } from '../../../../../../shared/enums/messages-failed-request';
import { QueryTypeIdsEnum } from '../../../../shared/enums/query-type-ids';
import { QUERY_TYPE_IDS } from '../../../../../../shared/consts/query-type-ids';

export const CreditQueryStatistic = createParamDecorator((data: string, ctx: ExecutionContext): ITypeQuery => {
    const request = ctx.switchToHttp().getRequest();

    let typeQuery: ITypeQuery = {
        customerGUID: request.body.customerGUID,
        userAgent: request.headers['user-agent'],
        requestIp: requestIp.getClientIp(request),
    };

    if (!QUERY_TYPE_IDS.includes(parseInt(request.params.queryTypeId))) {
        throw new BadRequestException(ErrorMesaggesEnum.QUERY_TYPE_ID_INVALID);
    }

    if (request.params.queryTypeId == QueryTypeIdsEnum.FEE_QUERY_ID && !request.body.creditGUID) {
        throw new BadRequestException(ErrorMesaggesEnum.CREDIT_ID_REQUIRED);
    } else {
        typeQuery.creditGUID = request.body.creditGUID;
    }

    return typeQuery;
});

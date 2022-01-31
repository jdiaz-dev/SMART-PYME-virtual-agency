import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { isArray, merge, isString, isBoolean } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class BasicResponse {
    @ApiProperty({ example: 200 })
    status: number;

    @ApiProperty()
    message: string;

    @ApiProperty({ type: {} })
    data: any = {};
}

@Injectable()
export class BaseResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const statusCode = context.switchToHttp().getResponse().statusCode;
        return next.handle().pipe(
            map((result) => {
                const standarResponse = this.standarizeResponse(statusCode, result);
                return {
                    ...standarResponse,
                };
            }),
        );
    }

    private standarizeResponse(status: number, result: any): BasicResponse {
        const response = { status, message: 'success', data: {} } as BasicResponse;
        if (!result) return response;
        if (isArray(result) || isString(result) || isBoolean(result)) {
            response.data = result;
            return response;
        }
        // const { message: message, dataValues, ...others } = result;
        return merge(response, { data: result });
    }
}

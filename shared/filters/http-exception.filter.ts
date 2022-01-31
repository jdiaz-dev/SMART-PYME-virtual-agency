import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        let currentDate = new Date().toLocaleString('es-PE', {
            timeZone: 'America/Lima',
        });

        Logger.debug(currentDate, 'Date');
        Logger.error(exception, undefined, 'Exception');
        //Logger.error(ctx.getRequest().headers, undefined, 'Headers');
        Logger.error(ctx.getRequest().url, undefined, 'url');
        Logger.error(ctx.getRequest().method, undefined, 'method');
        Logger.error(ctx.getRequest().params, undefined, 'params');
        Logger.error(ctx.getRequest().query, undefined, 'query');
        Logger.error(ctx.getRequest().body, undefined, 'body');
        const response = ctx.getResponse();
        const status = this.getStatus(exception);
        const message = this.getMessage(exception);
        const errorResponse = {
            status,
            ...message,
            date: currentDate,
        };
        response.status(status).json(errorResponse);
    }

    private getStatus(exception: any) {
        const isHttpException = exception instanceof HttpException && exception.getStatus;
        if (isHttpException) return exception.getStatus();
        if (exception.error?.statusCode) return exception.error.statusCode;
        return 500;
    }

    private getMessage(exception: any) {
        const isHttpException = exception instanceof HttpException && exception.getResponse;

        // console.log(exception);
        if (isHttpException) {
            const _response: any = exception.getResponse();
            const message = _response.message;
            const hasValidationErrors = Array.isArray(message);
            if (hasValidationErrors) return { message: 'validator errors', validatorErrors: message };

            return { message };
        }
        if (exception.error?.message) return { message: exception.error.message };
        return { message: 'Internal Server Error' };
    }
}

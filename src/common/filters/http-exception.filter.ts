import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exeptionResponse = exception.getResponse();

    const error =
      typeof exeptionResponse === 'string'
        ? { message: exeptionResponse }
        : (exeptionResponse as Record<string, any>);

    return response.status(status).json({
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      ...error,
    });
  }
}

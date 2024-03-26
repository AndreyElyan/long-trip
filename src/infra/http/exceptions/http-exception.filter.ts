import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

export interface HttpExceptionResponse {
  statusCode: number;
  message: any;
  error: string;
}

export const getErrorMessage = <T>(exception: T): any => {
  if (exception instanceof HttpException) {
    const errorResponse = exception.getResponse();
    const errorMessage
      = errorResponse as HttpExceptionResponse['message'] || exception.message;

    return errorMessage;
  }
  return String(exception);
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const status
      = exception instanceof HttpException ?
        exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: getErrorMessage(exception),
      type: exception?.response?.type ?? 'unknown_error',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

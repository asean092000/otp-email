import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Request, Response } from "express";
@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  getStatusSuccess(statusCode: number) {
    const statusSuccesses = [200, 201, 204, 205];
    return statusSuccesses.includes(statusCode);
  }

  catch(exception: any, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here

    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const exceptionRes = exception.getResponse();

    const message =
      typeof exception.message === "string"
        ? exception.response
        : "Something wrong!";
    const statusCode =
      exceptionRes.response?.statusCode ||
      exceptionRes.status ||
      exception.getStatus();

    const responseBody = {
      statusCode,
      success: this.getStatusSuccess(
        exceptionRes.response?.statusCode || exceptionRes.status
      ),
      data: null,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(statusCode).json(responseBody);
  }
}

import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from './../decorators/public.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyHeader = request.header('X-API-KEY');
    const apiKey = this.configService.get('API_KEY');
    return apiKeyHeader === apiKey;
  }
}

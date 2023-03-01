import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const uid = crypto.randomUUID();

    const timeLabel = `Request-response time ${uid}`;

    console.time(timeLabel);

    res.on('finish', () => console.timeEnd(timeLabel));
    next();
  }
}

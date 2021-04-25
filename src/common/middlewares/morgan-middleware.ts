import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    morgan(
      ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms',
    )(req, res, next);
  }
}

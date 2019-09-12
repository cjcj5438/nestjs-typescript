import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DemoMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('hello ～');
    req.user = {
      roles: ['guest'],
    };
    if (req.header('x-demo') === 'secret') {
      req.user = {
        roles: [
          'member',
        ],
      };
      next();
    } else {
      next();
    }
  }
}

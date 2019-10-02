import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    console.log('before...');
    // next.handle()返回的rxjs的操作原，后面需要去扩展
    return next.handle().pipe(tap(() => console.log(`after...${Date.now() - now}ms`)));
  }
}

/*
ArgumentsHost：ArgumentsHost。switchToHttp。getRequest
* 根据不同的请求使用不同的方法
* getClass获取使用的类
* getHandler 获取使用的方法
* */

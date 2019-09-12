import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DemoAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 守卫的返回值boolean，要找找方法就要到ExecutionContext这上面找
    const request = context.switchToHttp().getRequest();
    return request.header('x-demo') === 'secret';
  }
}

/*守卫是一个类。要用injectable装饰一下*/

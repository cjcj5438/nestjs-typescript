import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class DemoRolesGuard implements CanActivate {
  // Reflection反射 来获取
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log('handler:', context.getHandler());
    // console.log('class', context.getClass());
    // 得到处理器上面附加的roles这个数据，
    // 返回的是组string，要得到的数据是roles 数据附加的地方是context.getHandler()
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    // 检查里面有没有这个角色
    const hasRole = () => user.roles.some(role => roles.includes(role));
    return user && user.roles && hasRole();
  }
}

import { createParamDecorator } from '@nestjs/common';

/**
 *
 * data ;就是使用装饰器的时候传递的参数，
 * req；表示请求
 */
export const User = createParamDecorator((data, req) => {
  console.log(data);
  // 这个返回就是req.user， req里面的user
  return req.user;
});

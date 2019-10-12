import { createParamDecorator } from '@nestjs/common';
// 参数装饰器
export const User = createParamDecorator((data, req) => {
  return req.user;
});

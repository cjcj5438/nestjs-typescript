import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DemoFilter } from './core/filters/demo.filter';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 添加全局过滤器
  // app.useGlobalFilters(new DemoFilter());
  // 全局添加拦截器， 那么会有一个问题。就是不能添加依赖，可以把这个添加到 module 上
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}

bootstrap();

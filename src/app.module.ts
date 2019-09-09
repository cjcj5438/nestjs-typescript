import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { DemoMiddleware } from './core/middleware/demo.middleware';

@Module({
  // 可以把响应的控制器。 服务等放在模块里面
  imports: [PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  /*添加中间件方法, TODO：多个中间件怎么添加呢？*/
  configure(consumer): any {
    consumer
      .apply(DemoMiddleware)
      .forRoutes('posts');
  }
}

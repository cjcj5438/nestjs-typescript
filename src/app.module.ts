import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
<<<<<<< HEAD
import { PostModule } from './modules/post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), PostModule],
=======
import { PostsModule } from './posts/posts.module';
import { DemoMiddleware } from './core/middleware/demo.middleware';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { DemoRolesGuard } from './core/guards/demo-roles.guard';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';

@Module({
  // 可以把响应的控制器。 服务等放在模块里面
  imports: [PostsModule],
>>>>>>> 3359d1389ba57880bddf3e10d6b31be4113d9c12
  controllers: [AppController],
  // provider 里面可以放服务，全局守卫,可以发放拦截器
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: DemoRolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
<<<<<<< HEAD
export class AppModule {
=======
export class AppModule implements NestModule {
  /*添加中间件方法, TODO：多个中间件怎么添加呢？*/
  configure(consumer): any {
    consumer
      .apply(DemoMiddleware)
      .forRoutes('posts');
  }
>>>>>>> 3359d1389ba57880bddf3e10d6b31be4113d9c12
}

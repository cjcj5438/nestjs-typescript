nest g serve demo  创建一个服务。可以写控制里面的逻辑
nest g module demo 创建一个服务模块。每个模块可以包含这些控制器。 服务可以注入到控制器 里面使用
    每个模块都可以包含一些自己的东西。比如控制器
    providers:里面最好是放一些serve服务相关的文件
nest g middleware demo 创建一个中间件。可以修改请求响应
nest generate middleware demo core/middleware  在core 目录下创建一个middleware 中间件
nest generate interface post post/interface   创建一个接口
nest generate guard demoAuth core/guards 作用是决定请求是否可以通过，守卫会在中间件以后，拦截器和管道之前执行
nest generate decorator roles core/decorators 自定义装饰器

Pipes 管道：
    npm install class-transformer class-validator --save 管道可以依赖的两个包
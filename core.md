nest g serve demo  创建一个服务。可以写控制里面的逻辑
nest g module demo 创建一个服务模块。每个模块可以包含这些控制器。 服务可以注入到控制器 里面使用
    每个模块都可以包含一些自己的东西。比如控制器
    providers:里面最好是放一些serve服务相关的文件
nest g middleware demo 创建一个中间件。可以修改请求响应
nest generate middleware demo core/middleware  在core 目录下创建一个middleware 中间件
nest generate interface post post/interface   创建一个接口
 

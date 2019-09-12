import {
  Body,
  Controller, ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put, SetMetadata,
  UseFilters, UseGuards, UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DemoService } from './providers/demo/demo.service';
import { CreatePostDto } from './post.dto';
import { DemoFilter } from '../core/filters/demo.filter';
import { DemoAuthGuard } from '../core/guards/demo-auth.guard';
// import { Roles } from '../core/decorators/roles.decorator';
import { LoggingInterceptor } from '../core/interceptors/logging.interceptor';
import { TransformInterceptor } from '../core/interceptors/transform.interceptor';
import { ErrorsInterceptor } from '../core/interceptors/errors.interceptor';
import { User } from '../core/decorators/user.decorator';
import { DemoPipe } from '../core/pipes/demo.pipe';

@Controller('posts')
// @UseGuards(DemoAuthGuard)  // 守卫可以添加到控制。全局，单个方法。多个守卫用逗号间隔
// @UseInterceptors(LoggingInterceptor) // 在类上添加拦截器
export class PostsController {
  private readonly demoService;

  // 如果是在参数里面写private 那么可以不用写this.demoService这些
  constructor(demoService: DemoService) {
    this.demoService = demoService;
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe, DemoPipe) id) {
    console.log(typeof id);
    // 原来的id 是string 类型。使用了管道类型转换ParseIntPipe变成了number类型
    return {
      title: `Post ${id}`,
    };
  }

  @Post()
  @UsePipes(ValidationPipe)
  @SetMetadata('roles', ['member']) // 附加一些数据，可以让守卫得到
  // @Roles('member') // 自定义装饰器  和上面的方式一样
  // user 加载 middleware 里面
  store(@Body() post: CreatePostDto, @User('demo') user) {
    console.log('user::::', user);
    return this.demoService.create(post);
  }

  @Put()
  @UseFilters(DemoFilter)  // 可以加到控制器的方法里。 也可以加到全局的，也可以加到控制器里
  @UseInterceptors(ErrorsInterceptor)
  puts() {
    throw new ForbiddenException();
    // 错误状态码有很多
    // throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
  }
}

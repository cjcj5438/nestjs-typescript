import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put, SetMetadata,
  UseFilters, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DemoService } from './providers/demo/demo.service';
import { CreatePostDto } from './post.dto';
import { DemoFilter } from '../core/filters/demo.filter';
import { DemoAuthGuard } from '../core/guards/demo-auth.guard';
import { Roles } from '../core/decorators/roles.decorator';

@Controller('posts')
// @UseGuards(DemoAuthGuard)  // 守卫可以添加到控制。全局，单个方法。多个守卫用逗号间隔
export class PostsController {
  private readonly demoService;

  // 如果是在参数里面写private 那么可以不用写this.demoService这些
  constructor(demoService: DemoService) {
    this.demoService = demoService;
  }

  @Get()
  index() {
    return this.demoService.findAll();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id) {
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
  store(@Body() post: CreatePostDto) {
    return this.demoService.create(post);
  }

  @Put()
  @UseFilters(DemoFilter)  // 可以加到控制器的方法里。 也可以加到全局的，也可以加到控制器里
  puts() {
    // 错误状态码有很多
    throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
  }
}

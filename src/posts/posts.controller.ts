import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, UseFilters } from '@nestjs/common';
import { DemoService } from './providers/demo/demo.service';
import { CreatePostDto } from './post.dto';
import { DemoFilter } from '../core/filters/demo.filter';

@Controller('posts')
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

  @Post()
  store(@Body() post: CreatePostDto) {
    return this.demoService.create(post);
  }

  @Put()
  @UseFilters(DemoFilter)
  puts() {
    // 错误状态码有很多
    throw new HttpException('没有权限', HttpStatus.FORBIDDEN);
  }
}

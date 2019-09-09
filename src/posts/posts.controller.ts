import { Controller, Get, Query, Req, Headers, Param, Post, Body } from '@nestjs/common';
import { CreatePostDTO } from './post.dto';

@Controller('posts')
export class PostsController {
  @Get('get')
  index(@Req() request, @Query() query, @Headers('host') headers) {
    // console.log(request);
    console.log(query); // url 上面的参数， 可以是body header 很多
    console.log(headers);
    // 装饰器里面带了参数的。 那么返回就是返回体 这个属性值
    return 'postsxxx';
  }

  @Get(':id')
  show(@Param() params) {
    return `路由中带的参数${params.id}`;

  }

  @Post()
  store(@Body() body: CreatePostDTO) {
    // 使用DTO 的方法来处理返回值。实际用途还是要继续实践
    console.log(body.title);
  }
}

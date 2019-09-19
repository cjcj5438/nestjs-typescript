import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Post()
  async store(@Body() data: PostDto) {
    return await this.postService.store(data);
  }

  @Get()
  async index() {
    return await this.postService.index();
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return await this.postService.show(id);
  }

  // 更新数据用put,
  // todo:Partial 部分符合
  // TODO：每次写一个接口就要 重启服务
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<PostDto>) {
    return await this.postService.update(id, data);
  }

  // 删除返回的东西后期要在开发中进行优化
  @Delete(':id')
  async destroy(@Param('id') id: string) {
    return await this.postService.destroy(id);
  }
}

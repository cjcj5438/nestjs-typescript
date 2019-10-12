import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/core/decorators/user.decorator'; // 参数装饰器
import { User as UserEntity } from '../user/user.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Post()
  @UseGuards(AuthGuard())
  // 发布新东西，需要储存下用户相关联的东西
  //
  async store(@Body() data: PostDto, @User() user: UserEntity) {
    return await this.postService.store(data, user);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor) // 添加拦截器。过滤掉密码
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

  @Post(':id/vote')
  @UseGuards(AuthGuard())
  async vote(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity) {
    return await this.postService.vote(user, id);
  }

  @Delete(':id/vote')
  @UseGuards(AuthGuard())
  async unVote(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity) {
    return await this.postService.unVote(user, id);
  }

  @Get(':id/liked')
  @UseInterceptors(ClassSerializerInterceptor)
  async liked(@Param('id', ParseIntPipe) id: number) {
    return await this.postService.liked(id);
  }
}

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {
  }

  async store(data: PostDto, user: User) {
    const entity = await this.postRepository.create(data);
    await this.postRepository.save({
      ...entity, user,
    });
    return entity;
  }

  async index() {
    const entities = await this.postRepository.find({
      // 在返回的数据中想包含用户数据，可以这么写
      relations: ['user'],
    });
    return entities;
  }

  async show(id: string) {
    const result = await this.postRepository.findOne(id);
    return result;
  }

  async update(id: string, data: Partial<PostDto>) {
    return await this.postRepository.update(id, data);
  }

  async destroy(id: string) {
    return await this.postRepository.delete(id);
  }
}

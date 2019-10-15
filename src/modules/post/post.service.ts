import { Injectable, Query } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';
import { ListOptionsInterface } from '../../core/interfaces/list-options.interface';

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

  async index(options: ListOptionsInterface) {
    const { categories } = options;
    const queryBuilder = await this.postRepository.createQueryBuilder('post'); // 创建一个查询器
    queryBuilder.leftJoinAndSelect('post.user', 'user'); // 修改查询别名
    queryBuilder.leftJoinAndSelect('post.category', 'category');
    if (categories) {
      queryBuilder.where('category.alias IN (:...categories)', { categories });
    }
    return queryBuilder.getMany();
    // const entities = await this.postRepository.find({
    //   // 在返回的数据中想包含用户数据，可以这么写
    //   relations: ['user', 'category'],
    // });
    // return entities;
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

  // 保存用户投票关系 的关系
  async vote(user: User, id: number) {
    await this.postRepository
      .createQueryBuilder()// 创建一个查询空间器
      .relation(User, 'voted')// 设置关系  关系就是User实体上面的 voted
      .of(user)// 给他的关系是用户实体或者用户的id
      .add(id); // 可以是post实体可以是post id
  }

  // 保存用户投票关系 的关系
  async unVote(user: User, id: number) {
    await this.postRepository
      .createQueryBuilder()// 创建一个查询空间器
      .relation(User, 'voted')// 设置关系  关系就是User实体上面的 voted
      .of(user)// 给他的关系是用户实体或者用户的id
      .remove({ id }); // 可以是post实体可以是post id
  }

  // 文章投过票的用户名
  async liked(id: number) {
    return await this.postRepository
      .createQueryBuilder()// 查询构建器
      .relation(Post, 'liked') // 关系
      .of(id)// 然后把id交给这个方法
      .loadMany();
    // findOne(id, { relations: ['voted'] });
  }
}

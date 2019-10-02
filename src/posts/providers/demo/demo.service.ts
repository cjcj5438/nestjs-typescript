import { Injectable } from '@nestjs/common';
import { Post } from '../../../post/interface/post.interface';

@Injectable()
export class DemoService {
  private readonly post: Post[] = [];

  findAll(): Post[] {
    return this.post;
  }

  create(post: Post) {
    this.post.push(post);
  }
}

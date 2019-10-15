import { Injectable } from '@nestjs/common';
import { Category } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  // 存储分类的方法 注入实体 后要在模块中导入
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {
  }

  async store(data: CategoryDto) {
    const entity = await this.categoryRepository.create(data);
    return await this.categoryRepository.save(entity);
  }
}

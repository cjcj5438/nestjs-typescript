import { Body, Controller, Post } from '@nestjs/common';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  @Post()
  async store(@Body() data: CategoryDto) {
    await this.categoryService.store(data);
  }
}

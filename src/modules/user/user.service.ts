import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePasswordDto, UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

  }

  //  保存用户名
  async store(data: UserDto) {
    const { name } = data;
    const user = await this.userRepository.findOne({ name });
    if (user) {
      throw new BadRequestException('用户已经存在');
    }
    const entity = await this.userRepository.create(data);
    await this.userRepository.save(entity);
  }

  // 查找用户
  async show(id: string) {
    const entity = await this.userRepository.findOne(id, {
      relations: ['posts'],
    });
    if (!entity) {
      throw new NotFoundException('没有找到用户');
    }
    return entity;
  }

  // 修改密码
  async updatePassword(id: string, data: UpdatePasswordDto) {
    const { password, newPassword } = data;
    const entity = await this.userRepository.findOne(id);
    if (!entity) {
      throw new NotFoundException('没有找到用户');
    }
    const pass = await entity.comparePassword(password);
    if (!pass) {
      throw new BadRequestException('密码验证失败，请重新输入正确密码');
    }
    entity.password = newPassword;
    return await this.userRepository.save(entity);
  }

  async findByName(name: string) {
    return await this.userRepository.findOne({ name });
  }

  // 用户投过票的文章的方法
  async liked(id: number) {
    return await this.userRepository.findOne(id, {
      relations: ['voted', 'voted.user'],
    });
  }
}

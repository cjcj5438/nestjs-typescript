import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    // sql 链接
    TypeOrmModule.forRoot(),
    PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('longtext', { nullable: true })
  body: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
  /**
   * 多对一的关系【多对一和一对多的关系是成对出现的】
   * args：链接的是User实体
   * args：反向指向posts
   */
  @ManyToOne(type => User, user => user.posts)
  user: User;
  /**
   * 多对多
   */
  @ManyToMany(type => User, user => user.voted)
  liked: [];
}

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @CreateDateColumn()
  created: Date;
  @Column('longtext')
  body: string;
  @CreateDateColumn()
  updated: Date;

}

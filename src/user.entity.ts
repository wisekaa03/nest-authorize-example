import {
  Entity,
  Column,
  OneToMany,
  Index,
  PrimaryGeneratedColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { WHENCE } from './constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  @Index({ unique: true })
  username!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'enum', enum: WHENCE })
  type!: WHENCE;

  @OneToMany(() => Token, (token) => token.token)
  tokens?: Token[];
}

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id!: number;

  @RelationId((token: Token) => token.user)
  userId!: number;

  @ManyToOne(() => User, (user) => user.tokens)
  user!: User;

  @Column()
  @Index({ unique: true })
  token!: string;
}

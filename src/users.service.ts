import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request as ExpressRequest } from 'express';
import { DeleteResult, Repository } from 'typeorm';
import { User, Token } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ username });
  }

  async removeToken(
    req: ExpressRequest,
    all: boolean,
  ): Promise<DeleteResult | undefined> {
    const user = req.user as User;
    if (user) {
      if (all === true) {
        return this.tokenRepository.delete({ userId: user.id });
      } else {
        const authorization = req.headers.authorization;
        if (authorization) {
          return this.tokenRepository.delete({ token: authorization });
        }
      }
    }
  }
}

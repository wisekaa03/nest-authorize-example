import {
  Controller,
  Get,
  NotAcceptableException,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signin')
  signin() {
    throw new NotAcceptableException();
  }

  @Post('signup')
  signup() {
    throw new NotAcceptableException();
  }

  @Get('user')
  user() {
    throw new NotAcceptableException();
  }

  @Get('ping')
  ping() {
    throw new NotAcceptableException();
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Request() req: ExpressRequest, @Param() all: string) {
    return this.usersService.removeToken(req, all === 'true');
  }
}

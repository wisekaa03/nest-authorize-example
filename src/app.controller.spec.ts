import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { UsersService } from './users.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [UsersService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(appController.getHello()).toBe('Hello World!');
    // });
  });
});

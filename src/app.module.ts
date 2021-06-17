import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { UsersService } from './users.service';
import { User, Token } from './user.entity';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.local/.env' }),

    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10m' },
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        name: 'default',
        type: 'postgres',
        uuidExtension: 'pgcrypto',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'nest-auth'),
        password: configService.get<string>('DB_PASSWORD', 'nest-auth'),
        database: configService.get<string>('DB_DATABASE', 'nest-auth'),
        logging: configService.get('DB_LOGGING', 'error').split(','),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),

    TypeOrmModule.forFeature([User, Token]),
  ],
  controllers: [AppController],
  providers: [UsersService, JwtStrategy],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
    TypeOrmModule.forFeature([AuthRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // auth모듈에서 사용하기 위해 jwtStrategy를 넣어줌.
  exports: [JwtStrategy, PassportModule], // 다른 모듈에서도 사용하기 위함
})
export class AuthModule {}

// secret: secret text를 만들기 위한 토큰값.

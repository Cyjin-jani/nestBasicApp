import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepository } from './auth.repository';
import { User } from './user.entity';

// nest에서는 injectable을 넣어주어야 이 서비스를 다른 곳에서도 사용이 가능하다.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepotistory: AuthRepository,
  ) {
    super({
      secretOrKey: 'Secret1234',
      // 헤더에 bearerToken에 jwt 토큰을 넣었기 때문.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { username } = payload;
    const user: User = await this.authRepotistory.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

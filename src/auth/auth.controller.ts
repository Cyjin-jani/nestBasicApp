import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/authCredential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard()) // authGuard는 passport에서 제공. req안에 유저 정보가 들어간다
  test(@Req() req) {
    console.log('req', req);
  }
}

// nest js의 미들웨어 guards
// 인증 관련된 미들웨어이다. 지정된 경로로 통과할 수 있는 사람과 없는 사람을 서버에 알려준다.

// 각 미들웨어가 called 되는 순서는 아래와 같다.
// middleware -> guard -> intercepter(before) -> pipe -> controller -> service
// -> controller -> intercepter(after) -> filter (if applicable) -> client side

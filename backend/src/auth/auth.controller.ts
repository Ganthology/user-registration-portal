import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('create-admin')
  createAdmin(@Body() registerDto: AuthDto) {
    return this.authService.createAdmin(registerDto);
  }

  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}

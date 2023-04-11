import { Controller, Post, Body } from '@nestjs/common';
import { AuthLoginDTO } from '../dto/auth-login.dto';
import { AuthRegisterDTO } from '../dto/auth-register.dto';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.authService.createToken();
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.checkToken();
  }
}

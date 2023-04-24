import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthLoginDTO } from '../dto/auth-login.dto';
import { AuthRegisterDTO } from '../dto/auth-register.dto';
import { AuthService } from '../services/auth.service';
import { AuthForgetPasswordDTO } from '../dto/auth-forgotPassword.dto';
import { AuthResetDTO } from '../dto/auth-reset.dto';
import { CustomersService } from 'src/customers/services/customers.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly customerService: CustomersService,
  ) {}
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forgotPassword(@Body() { email }: AuthForgetPasswordDTO) {
    return this.authService.forgot(email);
  }

  @Post('reset')
  async resetPassword(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() req) {
    return { req };
  }
}

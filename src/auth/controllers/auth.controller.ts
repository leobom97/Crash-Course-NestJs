import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthLoginDTO } from '../dto/auth-login.dto';
import { AuthRegisterDTO } from '../dto/auth-register.dto';
import { AuthService } from '../services/auth.service';
import { AuthForgetPasswordDTO } from '../dto/auth-forgotPassword.dto';
import { AuthResetDTO } from '../dto/auth-reset.dto';
import { CustomersService } from 'src/customers/services/customers.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly customerService: CustomersService,
  ) {}
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO, @Res() res: Response) {
    return (
      this.authService.login(email, password),
      res.json({ message: 'Seja Bem vido fulano de tal' })
    );
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.customerService.createCustomer(body);
  }

  @Post('forget')
  async forgotPassword(@Body() { email }: AuthForgetPasswordDTO) {
    return this.authService.forgot(email);
  }

  @Post('reset')
  async resetPassword(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }
}

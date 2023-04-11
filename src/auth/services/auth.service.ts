import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  //Metodo que vai gerar o Token
  async createToken() {
    //return this.jwtService.sign()
  }

  //Metodo que vai verificar o Token
  async checkToken() {
    //return this.jwtService.verify(token);
  }
}

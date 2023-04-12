import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from 'src/customers/entities/customer.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
    private readonly jwtService: JwtService,
  ) {}

  //Metodo que vai gerar o Token
  async createToken(customer: Repository<Customers>) {
    /*return this.jwtService.sing({
      sub: this.customerRepository.getId(),
    });*/
  }

  //Metodo que vai verificar o Token
  async checkToken() {
    //return this.jwtService.verify(token);
  }

  async login(email: string, password: string) {
    const customer = await this.customerRepository.findOne({
      where: {
        email: email,
        password: password,
      },
    });

    if (!customer) {
      throw new NotFoundException('Usuário ou Senha inválidos');
    }

    return customer;
  }

  async forgot(email: string) {
    const customer = await this.customerRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!customer) {
      throw new NotFoundException('E-mail não encontrado!!!');
    }

    return true;
  }

  async reset(token: string, password: string) {
    const id = 0;
    await this.customerRepository.update({ id: id }, { password: password });

    return true;
  }
}

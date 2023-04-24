import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from 'src/customers/entities/customer.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthRegisterDTO } from '../dto/auth-register.dto';
import { CustomersService } from 'src/customers/services/customers.service';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'customers';

  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
    private readonly jwtService: JwtService,
    private readonly customerService: CustomersService,
  ) {}

  //Metodo que vai gerar o Token
  createToken(customer: Customers) {
    return {
      access_token: this.jwtService.sign(
        {
          name: customer.name,
          email: customer.email,
        },
        {
          expiresIn: '7 days',
          subject: String(customer.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  //Metodo que vai verificar o Token
  checkToken(token: string) {
    try {
      const customer = this.jwtService.verify(token, {
        audience: 'customers',
        issuer: 'login',
      });
      return customer;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const customer = await this.customerRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!customer) {
      throw new NotFoundException('Usuário ou Senha inválidos');
    }

    if (!(await bcrypt.compare(password, customer.password))) {
      throw new NotFoundException('Usuário ou Senha inválidos');
    }

    return this.createToken(customer);
  }

  //Nesse método não precisa retornar um token de acesso. Pois basta verificar se o email passado realmente existe
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

    const customers = (await this.customerRepository.update(
      { id: id },
      { password: password },
    )) as unknown as Customers;

    return this.createToken(customers);
  }

  async register(data: AuthRegisterDTO) {
    const customer = await this.customerService.createCustomer(data);

    return this.createToken(customer);
  }
}

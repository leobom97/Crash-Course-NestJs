/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateCustomerDTO } from '../dto/CreateCustomer.dto';
import { Repository } from 'typeorm';
import { Customers } from '../entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdatePUTCustomerDTO } from '../dto/UpdatePutCustomer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private readonly customerRepository: Repository<Customers>,
  ) {}

  async createCustomer(customerCreateUserDTO: CreateCustomerDTO) {
    const newCustomer = {
      ...customerCreateUserDTO,
      password: await bcrypt.hash(customerCreateUserDTO.password, 10),
    };

    const createdCustomer = this.customerRepository.create(newCustomer);

    await this.customerRepository.save(createdCustomer);

    return {
      ...createdCustomer,
      password: undefined,
    };
  }

  //Recebe todos os usuários cadastrados
  async receiveRegisteredCustomers() {
    return this.customerRepository.find();
  }

  async receiveRegisteredCustomer(id: number) {
    if (
      !(await this.customerRepository.findOne({
        where: {
          id: id,
        },
      }))
    ) {
      throw new NotFoundException(`O usuário ${id} não foi encontrado`);
    } else {
      return this.customerRepository.findOne({
        where: {
          id: id,
        },
      });
    }
  }

  async update(
    id: number,
    { name, email, password, role }: UpdatePUTCustomerDTO,
  ) {
    const customer = await this.customerRepository.findOne({
      where: { id: id },
    });

    if (!customer) {
      throw new NotFoundException(
        `Usuário com o id ${id} não foi encontrado!!!`,
      );
    }
    const salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password, salt);

    await this.customerRepository.update(
      { id: id },
      { name, email, password, role },
    );

    return {
      message: 'Usuário atualizado com sucesso!!!',
    };
  }

  async delete(id: number) {
    const customer = await this.customerRepository.delete(id);

    if (!customer) {
      throw new NotFoundException(
        `Usuário com o id ${id} não foi encontrado!!!`,
      );
    }

    return {
      message: 'Usuário deletado com sucesso!!!',
    };
  }
}

import {
  Controller,
  Param,
  Get,
  ParseIntPipe,
  Res,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDTO } from '../dto/CreateCustomer.dto';
import { UpdatePUTCustomerDTO } from '../dto/UpdatePutCustomer.dto';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';

//@UseInterceptors(LogInterceptor)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomersService) {}

  @Post()
  createCustomer(
    @Body() createCustomerDTO: CreateCustomerDTO,
    @Res() res: Response,
  ) {
    return (
      this.customerService.createCustomer(createCustomerDTO),
      res.json({ message: 'Usuário criado com sucesso!!' })
    );
  }

  @Get()
  usersList() {
    return this.customerService.receiveRegisteredCustomers();
  }

  @Get(':id')
  user(@ParamId() id: number) {
    return this.customerService.receiveRegisteredCustomer(id);
  }

  @Put(':id')
  updateCustomer(
    @ParamId() id: number,
    @Body() updatedPutCustomer: UpdatePUTCustomerDTO,
  ) {
    return this.customerService.update(id, updatedPutCustomer);
  }

  @Delete(':id')
  deleteCustomer(@ParamId() id: number) {
    return this.customerService.delete(id);
  }
}

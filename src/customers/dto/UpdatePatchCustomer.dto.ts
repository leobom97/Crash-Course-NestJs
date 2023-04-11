/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDTO } from './CreateCustomer.dto';

export class UpdatePATCHCustomerDTO extends PartialType(CreateCustomerDTO) {}

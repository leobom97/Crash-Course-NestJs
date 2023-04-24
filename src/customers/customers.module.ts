import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from './entities/customer.entity';
import { CustomerIdCheckMiddleware } from 'src/middlewares/customer-id-check.middleware';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customers]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersService, TypeOrmModule],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomerIdCheckMiddleware).forRoutes({
      path: 'customers/:id',
      method: RequestMethod.ALL,
    });
  }
}

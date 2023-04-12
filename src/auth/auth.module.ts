import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { CustomersModule } from 'src/customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      secret: 'g5&KyS-IV8i]#huyN@]fRRMCigX5~R0%',
    }),
    CustomersModule,
    TypeOrmModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

/* eslint-disable prettier/prettier */
import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class CustomerIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Parou no Middleware');

    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException(
        'Id Inválido. Por favor solicite um id válido de cliente!!!',
      );
    }

    console.log('Passou pelo Middleware');
    next();
  }
}

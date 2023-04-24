/* eslint-disable prettier/prettier */
import { MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @MinLength(60)
  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @MinLength(127)
  @Column({ type: 'text', nullable: false, unique: true })
  password: string;

  @Column({ type: 'int', nullable: false, default: 1 })
  role: number;
}

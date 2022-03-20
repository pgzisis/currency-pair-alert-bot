import { Rate } from '../interfaces/rate.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column({ type: 'varchar' })
  public pair: string;

  @Column({ type: 'json' })
  public previousRate: Rate;

  @Column({ type: 'json' })
  public currentRate: Rate;

  @Column({ type: 'float' })
  public percentageChange: number;

  @CreateDateColumn()
  public createdAt?: Date;
}

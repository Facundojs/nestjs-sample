import { Flavor } from './flavor.entity';
import {
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Entity,
  Column,
  Index,
} from 'typeorm';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  reccomendations: number;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors: Flavor[];
}

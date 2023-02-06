import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { PatchCoffeeDto } from './dto/patch-coffee.dto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [];

  findAll() {
    return this.coffees;
  }

  findOne(id: number) {
    return this.coffees.find((c) => c.id === +id);
  }

  create(body: CreateCoffeeDto) {
    const coffee = {
      id: this.coffees.length + 1,
      ...body,
    };

    this.coffees.push(coffee);

    return coffee;
  }

  patch(id: number, body: PatchCoffeeDto) {
    const index = this.coffees.findIndex((c) => c.id === id);
    if (index) {
      this.coffees[index] = {
        ...this.coffees[index],
        ...body,
      };
    }
    return this.coffees[index];
  }

  delete(id: number) {
    const coffee = this.coffees.find((c) => c.id === id);
    if (coffee) {
      this.coffees = this.coffees.filter((c) => c.id !== id);
    }
    return coffee;
  }
}

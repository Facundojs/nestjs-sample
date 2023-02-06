import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { PatchCoffeeDto } from './dto/patch-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @Get()
  findAll(@Query() pagination: { page: number; size: number }) {
    const { page = 1, size = 10 } = pagination;
    const coffees = this.coffeeService.findAll();
    return {
      data: coffees.slice((page - 1) * size, page * size),
      total: coffees.length,
      page,
      size,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id);
    const coffee = this.coffeeService.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  @Post()
  create(@Body() body: CreateCoffeeDto) {
    return this.coffeeService.create(body);
  }

  @Patch(':id')
  patch(@Body('body') body: PatchCoffeeDto, @Param('id') id: number) {
    return this.coffeeService.patch(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.coffeeService.delete(id);
  }
}

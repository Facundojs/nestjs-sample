import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { CoffeesService } from './coffees.service';
import {
  NotFoundException,
  Controller,
  Delete,
  Param,
  Patch,
  Query,
  Post,
  Body,
  Get,
} from '@nestjs/common';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeesService) {}

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Get()
  async findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    const coffees = await this.coffeeService.findAll(paginationQueryDto);
    return coffees;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const coffee = await this.coffeeService.findOne(id);
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
  async patch(@Body() body: UpdateCoffeeDto, @Param('id') id: number) {
    return this.coffeeService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeeService.remove(id);
  }
}

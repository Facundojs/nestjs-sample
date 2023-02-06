import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString({ each: true })
  readonly flavors: string[];

  @IsString()
  readonly brand: string;

  @IsString()
  readonly name: string;
}

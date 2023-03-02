import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  @ApiProperty({
    description: 'The flavors of a coffee.',
    example: ['chocolate', 'vanilla'],
  })
  @IsString({ each: true })
  readonly flavors: string[];

  @ApiProperty({
    description: 'The brand of a coffee.',
    example: 'Bolivian Coffee',
  })
  @IsString()
  readonly brand: string;

  @ApiProperty({
    description: 'The name of a coffee.',
    example: 'Bolivian Dark',
  })
  @IsString()
  readonly name: string;
}

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipeTsPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    const intVal = parseInt(value, 10);

    if (Number.isNaN(intVal)) {
      throw new BadRequestException(
        `Validation failed. "${value}" is not an integer`,
      );
    }

    return intVal;
  }
}

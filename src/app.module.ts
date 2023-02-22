import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        autoLoadEntities: true,
        synchronize: true,
        type: 'postgres',
      }),
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().hostname().required(),
        DATABASE_PORT: Joi.number().port().default(5432),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
      }),
    }),
    CoffeeRatingModule,
    CoffeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

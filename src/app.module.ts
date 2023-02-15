import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      synchronize: true,
      host: 'localhost',
      type: 'postgres',
      port: 5432,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

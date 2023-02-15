import { DataSource } from 'typeorm';

export default new DataSource({
  username: 'postgres',
  password: 'pass123',
  host: 'localhost',
  type: 'postgres',
  migrations: [],
  entities: [],
  port: 5432,
});

import { DataSource, DataSourceOptions } from "typeorm";

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
} as DataSourceOptions);
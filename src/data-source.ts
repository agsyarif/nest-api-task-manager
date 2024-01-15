import { DataSource, DataSourceOptions } from "typeorm";

export const appDataSource = new DataSource({
  // type: 'sqlite',
  // database: 'db.sqlite',
  // entities: ['**/*.entity.ts'],
  // migrations: ['migrations/*.ts'],

  type: "postgres",
  host: "0.0.0.0",
  port: 5432,
  username: "root",
  password: "root",
  database: "taskmanager",
  entities: ['**/*.entity.ts'],
  migrations: ['migrations/*.ts'],
} as DataSourceOptions);
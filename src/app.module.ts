import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { Users } from './user/User';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { TaskModule } from './task/task.module';
import { Tasks } from './task/Tasks';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        // signOptions: { expiresIn: '60s' },
      }),
    }),
    TypeOrmModule.forRoot({
      // type: 'sqlite',
      // database: 'db.sqlite',
      // entities: [Users, Tasks],
      // synchronize: false,
      type: "postgres",
      host: "0.0.0.0",
      port: 5432,
      username: "root",
      password: "root",
      database: "taskmanager",
      synchronize: false,
      logging: true,
      entities: [Users, Tasks],
      subscribers: [],
      migrations: []
    }),
    UserModule,
    AuthModule,
    TaskModule
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService],
})
export class AppModule {}

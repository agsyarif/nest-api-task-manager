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
import { TaskCategoryModule } from './task-category/task-category.module';
import { TaskCategoryEntity } from './task-category/task-category.entity';
// import { AxiosService } from './axios.service';
import { ChannelModule } from './channel/channel.module';
import { ChannelEntity } from './channel/channel.entity';
import { ChannelMethodModule } from './channel-method/channel-method.module';
import { ChannelMethodEntity } from './channel-method/channel-method.entity';
import { ReceiveFundsController } from './transactions/receive-funds/receive-funds.controller';
import { ReceiveFundsModule } from './transactions/receive-funds/receive-funds.module';
import { SignatureController } from './transactions/signature/signature.controller';
import { SignatureModule } from './transactions/signature/signature.module';
import { HttpModule } from '@nestjs/axios';
import { ProductModule } from './product/product.module';
import { ProductEntity } from './product/product.entity';

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
      entities: [Users, Tasks, TaskCategoryEntity, ChannelEntity, ChannelMethodEntity, ProductEntity],
      subscribers: [],
      migrations: []
    }),
    UserModule,
    AuthModule,
    TaskModule,
    TaskCategoryModule,
    ChannelModule,
    ChannelMethodModule,
    ReceiveFundsModule,
    SignatureModule,
    HttpModule.register({}),
    ProductModule
  ],
  controllers: [AppController, UserController, AuthController, ReceiveFundsController, SignatureController],
  providers: [AppService], //AxiosService
})
export class AppModule {}

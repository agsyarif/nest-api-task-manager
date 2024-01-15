import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './Tasks';
import { AuthMiddleware } from 'src/middlewares/auth-middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasks]),
    JwtModule.register({secret: 'rahasiabanget', signOptions: { expiresIn: '60s' }}),
  ],
  providers: [TaskService],
  controllers: [TaskController],
  exports: [TaskService]
})
export class TaskModule {}
// export class TaskModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//       consumer.apply(AuthMiddleware).forRoutes('*')
//   }
// }


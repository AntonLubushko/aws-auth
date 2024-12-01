import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserLoggerMiddleware } from './middleware/user.logger.middleware';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtStrategy } from './guard/auth.strategy';

@Module({
  imports: [PassportModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserLoggerMiddleware).forRoutes('user/info');
  }
}

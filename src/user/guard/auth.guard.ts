import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const token = context.switchToHttp().getRequest().headers.authorization;
    if (err || !user) {
      const message = JSON.stringify(info?.message || err);
      throw new UnauthorizedException(message);
    }

    return user;
  }
}

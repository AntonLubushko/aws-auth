import { Injectable } from '@nestjs/common';
type User = { userId: string; email: string };
@Injectable()
export class UserService {
  constructor() {}

  async getUserInfo(user: User) {
    return user;
  }
}

import { Controller, Get, UseGuards, Request, Response } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Request() req) {
    return this.userService.getUserInfo(req.user);
  }
}

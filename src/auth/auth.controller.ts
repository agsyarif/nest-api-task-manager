import { Body, Controller, Get, Headers, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { SigninDto } from './dtos/signin.dto';
import { AuthGuard } from 'src/guards/auth-guard';
import { Users } from 'src/user/User';
import { CurrentUser } from 'src/user/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body.name, body.email, body.password);
  }

  @Post('/signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body.email, body.password)
  }

  @Get('/current-user')
  @UseGuards(AuthGuard)
  currentUser(@Headers() header: any, @CurrentUser() user: Users) {
    console.log(user);
    
    return user;
  }
}
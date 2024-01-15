import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFoHeader(request)
    console.log(this.jwtService);
    
    if(!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: 'rahasiabanget'
        }
      );
      
      request['currentUser'] = payload;

    } catch (error) {
      
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFoHeader(request: Request) {
    const [ type, token ] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
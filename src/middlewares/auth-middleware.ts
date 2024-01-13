// auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Users } from 'src/user/User';

// menambahkan properti currentUser ke Express. untuk digunakan di req.currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser?: Users;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  async use(req: Request, res: any, next: () => void) {
    // const token = req.headers.authorization;

    const token = this.extractTokenFoHeader(req);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    
    try {
      const decoded = await this.jwtService.verify(token);
      console.log(decoded);
      
      req.currentUser = decoded;
      
      next();
    } catch (err) {
      console.log(err);
      
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFoHeader(request: Request) {
    const [ type, token ] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}

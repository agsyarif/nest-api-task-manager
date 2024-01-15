import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { utcToZonedTime } from 'date-fns-tz';
import { Observable } from 'rxjs';

@Injectable()
export class DateTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle();
  }
}

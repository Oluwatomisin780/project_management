import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    console.log('method', method);
    return next.handle().pipe(
      map((data) => {
        switch (context.getClass().name) {
          //  project Controller
          case 'ProjectController':
            return {
              success: true,
              message:
                method === 'POST'
                  ? 'Project created successfully'
                  : method === 'GET'
                    ? 'Project retrieved successfully'
                    : method === 'PATCH'
                      ? 'Project updated successfully'
                      : method === 'DELETE'
                        ? 'Project deleted successfully'
                        : 'Operation successful',
              data,
            };
          default:
            return {
              success: true,
              message: 'Operation successful', // changing this to be more dynamic based on the method and controller would be ideal but for now this is a generic message
              data,
            };
        }
      }),
    );
  }
}

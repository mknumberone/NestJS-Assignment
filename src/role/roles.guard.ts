import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor() { }

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        console.log(user,'user');
        if (user && user.role === 1) return true;
        throw new HttpException("Không được phép !", HttpStatus.FORBIDDEN)
    }
}

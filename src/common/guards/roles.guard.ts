import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enum/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtPayload } from '../interfaces/jwtpayload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleEnum[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!roles) return true;

    const req = context.switchToHttp().getRequest<{ user: JwtPayload }>();
    if (!req.user) return false;
    return roles.includes(req.user.role);
  }
}

import { Roles } from '@driverhub/shared-types';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const checkRole = this.reflector.getAllAndOverride<string[]>(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!checkRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return false;
    }
    const hasRole = checkRole.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException('شما اجازه دسترسی به این بخش را ندارید.');
    }

    return true;
  }
}

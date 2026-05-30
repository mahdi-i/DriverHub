import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const UserInfo = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new BadRequestException('کاربر لاگین نکرده است');
    }

    console.log(user, 'user user');
    console.log(data, 'data data');
    if (data) {
      return user[data];
    }
    return user;
  },
);

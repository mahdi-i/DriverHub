import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { generateQueryParams } from '@shared/utils/generate-url-params';
import { Request } from 'express';

export const Url = createParamDecorator((_, context: ExecutionContext) => {
  const request: Request = context.switchToHttp().getRequest();
  const stripedQuery = request.query;
  delete stripedQuery.page;
  delete stripedQuery.limit;
  return `${request.protocol}://${request.get('Host')}${request.baseUrl}${request.path}?${generateQueryParams(stripedQuery)}`;
});

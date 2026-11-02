import { ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';

import { JwtAuthGuard } from '../app/auth/jwt-auth.guard.js';

const publicPages = ['/', '/things'];

// Apollo mounts GET /graphql after the controllers, so the catch-all passes it on.
export const GRAPHQL_PATH = '/graphql';

// Client-side navigation loads a page's props from /_next/data/<build>/<page>.json.
const dataPage = (path: string) => {
  const data = path.match(/^\/_next\/data\/[^/]+(\/.+)\.json$/)?.[1];
  return data === '/index' ? '/' : data;
};

const isPublic = (path: string) => {
  const page = dataPage(path);
  if (page) return publicPages.includes(page);
  return (
    path === GRAPHQL_PATH ||
    publicPages.includes(path) ||
    /^\/(_next|__nextjs)/.test(path)
  );
};

@Injectable()
export class PageGuard extends JwtAuthGuard {
  canActivate(context: ExecutionContext) {
    const { path } = context.switchToHttp().getRequest<Request>();
    return isPublic(path) || super.canActivate(context);
  }
}

import type { SessionUser } from '../app/auth/session.js';

declare global {
  namespace Express {
    interface User extends SessionUser {}
    interface Request {
      user?: User;
    }
  }
}

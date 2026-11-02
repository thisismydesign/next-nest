import type { IncomingMessage } from 'node:http';

import { Chain } from './zeus';

export const graphql = (req: IncomingMessage) =>
  Chain(`http://localhost:${process.env.PORT ?? 3000}/graphql`, {
    headers: {
      'content-type': 'application/json',
      cookie: req.headers.cookie ?? '',
    },
  });

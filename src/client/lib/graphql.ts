import type { IncomingMessage } from 'node:http';

import { Chain } from './zeus';

// Pages query their own server; the request's cookie carries the session along.
export const graphql = (req: IncomingMessage) =>
  Chain(`http://localhost:${process.env.PORT ?? 3000}/graphql`, {
    headers: {
      'content-type': 'application/json',
      cookie: req.headers.cookie ?? '',
    },
  });

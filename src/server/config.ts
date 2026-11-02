import { z } from 'zod';

export const configSchema = z
  .object({
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.url(),
    JWT_SECRET: z.string().min(1),
    JWT_EXPIRES_IN: z
      .string()
      .regex(/^\d+\s*[a-z]+$/i, 'needs a unit, e.g. 10d'),
    OAUTH_GOOGLE_ID: z.string().min(1),
    OAUTH_GOOGLE_SECRET: z.string().min(1),
    OAUTH_GOOGLE_REDIRECT_URL: z.url(),
    OAUTH_COGNITO_ID: z.string().min(1),
    OAUTH_COGNITO_SECRET: z.string().min(1),
    OAUTH_COGNITO_REDIRECT_URL: z.url(),
    OAUTH_COGNITO_DOMAIN: z.string().min(1),
    OAUTH_COGNITO_REGION: z.string().min(1),
  })
  .refine(
    (config) =>
      config.NODE_ENV !== 'production' || config.JWT_SECRET.length >= 32,
    { path: ['JWT_SECRET'], message: 'needs 32+ characters in production' },
  );

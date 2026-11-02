import { expect, test } from '@playwright/test';

test('serves the landing page', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('next-nest');
  await expect(page.getByRole('link', { name: '/graphql' })).toBeVisible();
});

test('lists the seeded things from GraphQL', async ({ page }) => {
  await page.goto('/things');
  await expect(page.getByText('this is a thing you can order')).toBeVisible();
});

test('serves REST', async ({ request }) => {
  const res = await request.get('/api');
  expect(await res.json()).toMatchObject({ hello: 'from NestJS' });
});

test('passes GET /graphql on to GraphQL', async ({ request }) => {
  const res = await request.get('/graphql?query={things{name}}', {
    headers: { 'apollo-require-preflight': 'true' },
  });
  const { data } = await res.json();
  expect(data.things.length).toBeGreaterThan(0);
});

test('rejects private pages without a session', async ({ request }) => {
  const res = await request.get('/profile');
  expect(res.status()).toBe(401);
});

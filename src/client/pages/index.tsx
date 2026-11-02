import { Layout } from '../components/layout';

const routes: [string, string, string][] = [
  ['Pages', '/things', 'Rendered on the server from a typed GraphQL query.'],
  [
    '',
    '/orders',
    'Your orders, with a form that calls a mutation. Needs a session.',
  ],
  ['', '/profile', 'The session user. Needs a session.'],
  ['API', '/api', 'REST, JSON.'],
  ['', '/api/private', 'REST behind the JWT guard.'],
  ['', '/graphql', 'GraphQL, with GraphiQL outside production.'],
  ['Session', '/auth/google', 'Sign in with Google.'],
  ['', '/auth/cognito', 'Sign in with AWS Cognito.'],
  ['', '/auth/logout', 'Clear the session cookie.'],
];

const Home = () => (
  <Layout title="next-nest">
    <p>
      One NestJS server serves its REST and GraphQL API and these Next.js pages.
      Sign in to get a session cookie; the API and the private pages read it.
    </p>
    {routes.map(([section, href, text]) => (
      <dl key={href}>
        {section && <h2>{section}</h2>}
        <dt>
          <a href={href}>{href}</a>
        </dt>
        <dd>{text}</dd>
      </dl>
    ))}
  </Layout>
);

export default Home;

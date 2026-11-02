import { Layout } from '../components/layout';

const sections: [string, [string, string][]][] = [
  [
    'Pages',
    [
      ['/things', 'Rendered on the server from a typed GraphQL query.'],
      [
        '/orders',
        'Your orders, with a form that calls a mutation. Needs a session.',
      ],
      ['/profile', 'The session user. Needs a session.'],
    ],
  ],
  [
    'API',
    [
      ['/api', 'REST, JSON.'],
      ['/api/private', 'REST behind the JWT guard.'],
      ['/graphql', 'GraphQL, with GraphiQL outside production.'],
    ],
  ],
  [
    'Session',
    [
      ['/auth/google', 'Sign in with Google.'],
      ['/auth/cognito', 'Sign in with AWS Cognito.'],
    ],
  ],
];

const Home = () => (
  <Layout title="next-nest">
    <p>
      One NestJS server serves its REST and GraphQL API and these Next.js pages.
      Sign in to get a session cookie; the API and the private pages read it.
    </p>
    {sections.map(([section, routes]) => (
      <section key={section}>
        <h2>{section}</h2>
        <dl>
          {routes.map(([href, text]) => (
            <div key={href}>
              <dt>
                <a href={href}>{href}</a>
              </dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>
    ))}
  </Layout>
);

export default Home;

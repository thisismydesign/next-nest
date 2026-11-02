import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Layout } from '../components/layout';
import { graphql } from '../lib/graphql';

export const getServerSideProps = (async ({ req }) => {
  const { things } = await graphql(req)('query')({
    things: { id: true, name: true },
  });
  return { props: { things } };
}) satisfies GetServerSideProps;

const Things = ({
  things,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Layout title="Things">
    <ul>
      {things.map((thing) => (
        <li key={thing.id}>{thing.name}</li>
      ))}
    </ul>
  </Layout>
);

export default Things;

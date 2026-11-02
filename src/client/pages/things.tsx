import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

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
  <div>
    <h1>Things</h1>
    <ul>
      {things.map((thing) => (
        <li key={thing.id}>{thing.name}</li>
      ))}
    </ul>
  </div>
);

export default Things;

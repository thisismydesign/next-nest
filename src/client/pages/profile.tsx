import type { Request } from 'express';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Layout } from '../components/layout';

export const getServerSideProps = (async ({ req }) => ({
  props: { username: (req as Request).user!.username },
})) satisfies GetServerSideProps;

const Profile = ({
  username,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Layout title="Profile">
    <p>Signed in as {username}</p>
  </Layout>
);

export default Profile;

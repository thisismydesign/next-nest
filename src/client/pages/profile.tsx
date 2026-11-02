import type { Request } from 'express';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Layout } from '../components/layout';

export const getServerSideProps = (async ({ req }) => ({
  props: { user: (req as Request).user! },
})) satisfies GetServerSideProps;

const Profile = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <Layout title="Profile">
    <p>Signed in as {user.username}</p>
  </Layout>
);

export default Profile;

import type { Request } from 'express';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps = (async ({ req }) => ({
  props: { user: (req as Request).user! },
})) satisfies GetServerSideProps;

const Profile = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <div>
    <h1>Profile</h1>
    <p>Signed in as {user.username}</p>
  </div>
);

export default Profile;

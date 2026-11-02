import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { graphql } from '../lib/graphql';

export const getServerSideProps = (async ({ req }) => {
  const { orders } = await graphql(req)('query')({
    orders: { id: true, alias: true, thing: { name: true } },
  });
  return { props: { orders } };
}) satisfies GetServerSideProps;

const Orders = ({
  orders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <div>
    <h1>Orders</h1>
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          {order.alias}: {order.thing.name}
        </li>
      ))}
    </ul>
  </div>
);

export default Orders;

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';

import { Layout } from '../components/layout';
import { graphql } from '../lib/graphql';
import { Chain } from '../lib/zeus';

export const getServerSideProps = (async ({ req }) => {
  const { orders, things } = await graphql(req)('query')({
    orders: { id: true, alias: true, thing: { name: true } },
    things: { name: true },
  });
  return { props: { orders, things } };
}) satisfies GetServerSideProps;

const Orders = ({
  orders,
  things,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  const order = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await Chain('/graphql')('mutation')({
      createOrder: [
        {
          alias: String(form.get('alias')),
          thingName: String(form.get('thing')),
        },
        { id: true },
      ],
    });
    router.replace(router.asPath);
  };

  return (
    <Layout title="Orders">
      <ul>
        {orders.map((o) => (
          <li key={o.id}>
            {o.alias}: {o.thing.name}
          </li>
        ))}
      </ul>
      <form onSubmit={order}>
        <input name="alias" placeholder="alias" required />
        <select name="thing">
          {things.map((thing) => (
            <option key={thing.name}>{thing.name}</option>
          ))}
        </select>
        <button>Order</button>
      </form>
    </Layout>
  );
};

export default Orders;

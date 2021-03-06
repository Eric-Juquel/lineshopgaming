import Head from 'next/head';
import { getSession } from 'next-auth/client';

import OrdersScreen from '../../../components/admin/OrdersScreen';

import { listOrders } from '../../../redux/actions/orderActions';

import { wrapper } from '../../../redux/store';

export default function AdminOrdersPage() {
  return (
    <>
      <Head>
        <title>LineShop | Admin Orders</title>
        <meta name="description" content="All current orders" />
      </Head>
      <OrdersScreen />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      const session = await getSession({ req });

      if (!session) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }

      if (session.user.role !== 'admin') {
        return {
          redirect: {
            destination: '/auth/profile',
            permanent: false,
          },
        };
      }

      await store.dispatch(
        listOrders(req.headers.cookie, req, query.page, query.sort, query.order)
      );

      return {
        props: { session },
      };
    }
);

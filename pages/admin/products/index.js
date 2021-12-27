import Head from 'next/head';
import { getSession } from 'next-auth/client';

import ProductsScreen from '../../../components/admin/ProductsScreen';

import { listProducts } from '../../../redux/actions/productActions';

import { wrapper } from '../../../redux/store';

export default function AdminOrdersPage() {
  return (
    <>
      <Head>
        <title>LineShop | Admin Products</title>
        <meta name="description" content="All current orders" />
      </Head>
      <ProductsScreen />
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

      await store.dispatch(listProducts(req, query.page, query.search, query.category,query.sort, query.order));

      return {
        props: { session },
      };
    }
);

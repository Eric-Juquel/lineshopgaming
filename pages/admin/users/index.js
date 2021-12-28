import Head from 'next/head';
import { getSession } from 'next-auth/client';

import UsersScreen from '../../../components/admin/UsersScreen';

import { listUsers } from '../../../redux/actions/userActions';

import { wrapper } from '../../../redux/store';

export default function AdminUserssPage() {
  return (
    <>
      <Head>
        <title>LineShop | Admin Users</title>
        <meta name="description" content="All Users" />
      </Head>
      <UsersScreen />
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

      await store.dispatch(listUsers(req.headers.cookie, req, query.page, query.sort, query.order));

      return {
        props: { session },
      };
    }
);

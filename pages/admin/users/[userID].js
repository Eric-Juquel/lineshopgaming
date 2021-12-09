import Head from 'next/head';
import { getSession } from 'next-auth/client';

import UserDetailsScreen from '../../../components/admin/UserDetailsScreen';

import { getUserDetails } from '../../../redux/actions/userActions';

import { wrapper } from '../../../redux/store';

export default function AdminUserssPage() {
  return (
    <>
      <Head>
        <title>LineShop | User Details</title>
        <meta name="description" content="All Users" />
      </Head>
      <UserDetailsScreen />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
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
        getUserDetails(req.headers.cookie, req, params.userID)
      );

      return {
        props: { session },
      };
    }
);

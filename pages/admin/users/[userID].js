import Head from 'next/head';
import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import { getSession } from 'next-auth/client';
import UserDetailsScreen from '../../../components/admin/UserDetailsScreen';

import { getUserDetails } from '../../../redux/actions/userActions';

import { wrapper } from '../../../redux/store';


export default function AdminUserssPage({ rolesOptions }) {
  return (
    <>
      <Head>
        <title>LineShop | User Details</title>
        <meta name="description" content="All Users" />
      </Head>
      <UserDetailsScreen rolesOptions={rolesOptions} />
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

      // Get roles Options from User model
      const { origin } = absoluteUrl(req);
      const config = {
        headers: {
          cookie: req.headers.cookie,
        },
      };

      const { data } = await axios.get(
        `${origin}/api/admin/users/roles`,
        config
      );

      return {
        props: { session, rolesOptions: data.options },
      };
    }
);

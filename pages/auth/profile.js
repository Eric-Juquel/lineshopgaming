import { getSession } from 'next-auth/client';
import ProfileScreen from '../../components/auth/ProfileScreen';

import { wrapper } from '../../redux/store';
import { userOrders } from '../../redux/actions/orderActions';

export default function userProfilePage() {
  return <ProfileScreen />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });

      if (!session) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }

      await store.dispatch(userOrders(req.headers.cookie, req));

      return {
        props: { session },
      };
    }
);

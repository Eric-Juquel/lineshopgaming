import { getSession } from 'next-auth/client';
import OrderScreen from '../../components/order/OrderScreen';

import { wrapper } from '../../redux/store';
import { getOrderDetails } from '../../redux/actions/orderActions';

export default function userOrderDetailPage() {
  return <OrderScreen />;
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

      await store.dispatch(getOrderDetails(req.headers.cookie, req, params.orderID));

      return {
        props: { session },
      };
    }
);
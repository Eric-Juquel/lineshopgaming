import Head from 'next/head';
import OrderScreen from '../../components/order/OrderScreen';

import { setCartFromStorage } from '../../redux/actions/cartActions';
import { wrapper } from '../../redux/store';

export default function placeOrderPage() {
  return (
    <>
      <Head>
        <title>LineShop | User Order</title>
        <meta name="description" content="User Order" />
      </Head>
      <OrderScreen />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      // const { req } = context;

      const { cookies } = req;

      if (!cookies.cartItems) {
        return {
          redirect: {
            destination: '/products',
            permanent: false,
          },
        };
      } else if (!cookies.shippingAddress) {
        return {
          redirect: {
            destination: '/cart/shipping',
            permanent: false,
          },
        };
      } else if (!cookies.paymentMethod) {
        return {
          redirect: {
            destination: '/cart/payment',
            permanent: false,
          },
        };
      }
      else if (!cookies.placeOrder) {
        return {
          redirect: {
            destination: '/cart/placeOrder',
            permanent: false,
          },
        };
      }

      await store.dispatch(setCartFromStorage());
    }
);

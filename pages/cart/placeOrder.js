import Head from 'next/head';
import PlaceOrderScreen from '../../components/cart/PlaceOrderScreen';

import { setCartFromStorage } from '../../redux/actions/cartActions';
import { wrapper } from '../../redux/store';

export default function placeOrderPage() {
  return (
    <>
      <Head>
        <title>LineShop | Shipping Address</title>
        <meta name="description" content="User shipping address form" />
      </Head>
      <PlaceOrderScreen />
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

      await store.dispatch(setCartFromStorage());
    }
);

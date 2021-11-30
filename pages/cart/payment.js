import Head from 'next/head';
import PaymentScreen from '../../components/cart/PaymentScreen';

import { setCartFromStorage } from '../../redux/actions/cartActions';
import { wrapper } from '../../redux/store';

export default function paymentPage() {
  return (
    <>
      <Head>
        <title>LineShop | Payment Method</title>
        <meta name="description" content="User Payment Method form" />
      </Head>
      <PaymentScreen />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
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
      }
      await store.dispatch(setCartFromStorage());
    }
);

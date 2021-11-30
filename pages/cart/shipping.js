import Head from 'next/head';
import ShippingScreen from '../../components/cart/ShippingScreen';

import { setCartFromStorage } from '../../redux/actions/cartActions';
import { wrapper } from '../../redux/store';

export default function ShippingPage(props) {
  return (
    <>
      <Head>
        <title>LineShop | Shipping Address</title>
        <meta name="description" content="User shipping address form" />
      </Head>
      <ShippingScreen />
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
      }

      await store.dispatch(setCartFromStorage());
    }
);

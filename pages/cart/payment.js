import Head from 'next/head';
import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

import PaymentScreen from '../../components/cart/PaymentScreen';

import { setCartFromStorage } from '../../redux/actions/cartActions';
import { wrapper } from '../../redux/store';

export default function paymentPage({ paymentOptions }) {
  return (
    <>
      <Head>
        <title>LineShop | Payment Method</title>
        <meta name="description" content="User Payment Method form" />
      </Head>
      <PaymentScreen paymentOptions={paymentOptions} />
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

      //Get payment options from Order model
      const { origin } = absoluteUrl(req);

      const { data } = await axios.get(`${origin}/api/orders/paymentMethods`);

      return {
        props: { paymentOptions: data.options },
      };
    }
);

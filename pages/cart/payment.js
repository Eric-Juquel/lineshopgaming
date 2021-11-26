import Head from 'next/head';
import PaymentScreen from '../../components/cart/PaymentScreen';

import { setCartFromStorage } from '../../redux/actions/cartActions';
import { wrapper } from '../../redux/store';

export default function paymentPage(props) {
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
      await store.dispatch(setCartFromStorage());
    }
);

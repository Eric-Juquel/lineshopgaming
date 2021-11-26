import Head from 'next/head';
import CartScreen from '../../components/cart/CartScreen';

import { setCartFromStorage } from '../../redux/actions/cartActions';
import { wrapper } from '../../redux/store';

export default function CartPage() {
  return (
    <>
      <Head>
        <title>LineShop | Your Cart</title>
        <meta name="description" content="Items in cart" />
      </Head>
      <CartScreen />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      await store.dispatch(setCartFromStorage());
    }
);

import Head from 'next/head';
import InvoiceScreen from '../../components/order/InvoiceScreen';

import { setCartFromStorage } from '../../redux/actions/cartActions';
import { wrapper } from '../../redux/store';

export default function invoicePage() {
  return (
    <>
      <Head>
        <title>LineShop | Invoice</title>
        <meta name="description" content="Invoice" />
      </Head>
      <InvoiceScreen />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async ({req}) => {
    await store.dispatch(setCartFromStorage());
  }
);

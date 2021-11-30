import Head from 'next/head';
import InvoiceScreen from '../../components/cart/PlaceOrderScreen';


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



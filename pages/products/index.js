import Head from 'next/head';
import ProductsScreen from '../../components/products/ProductsScreen';

import { listProducts } from '../../redux/actions/productActions';

import { wrapper } from '../../redux/store';

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>LineShop | All Products</title>
        <meta
          name="description"
          content="All video games and consoles we are selling."
        />
      </Head>
      <ProductsScreen />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      await store.dispatch(listProducts(req, query.page));
    }
);

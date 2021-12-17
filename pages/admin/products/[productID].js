import Head from 'next/head';
import { getSession } from 'next-auth/client';

import ProductFormScreen from '../../../components/admin/ProductFormScren';
import axios from 'axios';
import absoluteUrl from 'next-absolute-url';
import { wrapper } from '../../../redux/store';
import { getProductDetails } from '../../../redux/actions/productActions';

export default function editProductPage({ categoriesOptions }) {
  return (
    <>
      <Head>
        <title>LineShop | Edit Product</title>
        <meta name="description" content="All current orders" />
      </Head>
      <ProductFormScreen action="edit" categoriesOptions={categoriesOptions} />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const session = await getSession({ req });

      if (!session) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }

      if (session.user.role !== 'admin') {
        return {
          redirect: {
            destination: '/auth/profile',
            permanent: false,
          },
        };
      }

      //Get categories options from Product model
      const { origin } = absoluteUrl(req);
      const { data } = await axios.get(`${origin}/api/products/categories`);

      await store.dispatch(getProductDetails(req, params.productID));

      return {
        props: { session, categoriesOptions: data.options },
      };
    }
);

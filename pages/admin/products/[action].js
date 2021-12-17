import Head from 'next/head';
import { getSession } from 'next-auth/client';

import ProductFormScreen from '../../../components/admin/ProductFormScren';
import capitalize from '../../../utils/capitalize';
import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

export default function ProductFormPage({ action, categoriesOptions }) {
  return (
    <>
      <Head>
        <title>{`LineShop |  ${capitalize(action)} Product`}</title>
        <meta name="description" content="All current orders" />
      </Head>
      <ProductFormScreen
        action={action}
        categoriesOptions={categoriesOptions}
      />
    </>
  );
}

export const getServerSideProps = async ({ req, params }) => {
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

  return {
    props: { session, action: params.action, categoriesOptions: data.options },
  };
};

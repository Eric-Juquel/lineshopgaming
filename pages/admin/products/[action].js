import Head from 'next/head';
import { getSession } from 'next-auth/client';

import ProductFormScreen from '../../../components/admin/ProductFormScren';
import capitalize from '../../../utils/capitalize';

export default function ProductFormPage({ action }) {
  return (
    <>
      <Head>
        <title>{`LineShop |  ${capitalize(action)} Product`}</title>
        <meta name="description" content="All current orders" />
      </Head>
      <ProductFormScreen action={action} />
    </>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });

  console.log('session', session);

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

  return {
    props: { session, action: params.action },
  };
};

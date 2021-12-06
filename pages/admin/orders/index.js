import { getSession } from 'next-auth/client';

import OrdersScreen from '../../../components/admin/OrdersScreen';

export default function AdminOrdersPage() {
  return <OrdersScreen />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

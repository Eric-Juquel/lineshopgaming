import { getSession } from 'next-auth/client';
import Logout from '../../components/auth/Logout';

const LogoutPage = () => {
  return <Logout />;
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
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

export default LogoutPage;

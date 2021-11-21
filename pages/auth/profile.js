import { getSession } from 'next-auth/client';
import ProfileScreen from '../../components/auth/ProfileScreen';

export default function userProfilePage() {
  return <ProfileScreen />;
}

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


import { getSession } from 'next-auth/client';

import Head from 'next/head';
import LoginScreen from '../components/auth/LoginScreen';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Lineshop | SignIn</title>
        <meta name="description" content="Sign In form " />
      </Head>

      <LoginScreen />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }

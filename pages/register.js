import { getSession } from 'next-auth/client';

import Head from 'next/head';
import RegisterScreen from '../components/auth/RegisterScreen';

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Lineshop | SignUp</title>
        <meta name="description" content="Sign Up form " />
      </Head>

      <RegisterScreen />
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

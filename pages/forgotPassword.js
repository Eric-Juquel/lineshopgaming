import Head from 'next/head';
import ForgotPasswordScreen from '../components/auth/ForgotPasswordScreen';

export default function forgotPasswordPage() {
  return (
    <>
      <Head>
        <title>Lineshop | Forgot Password</title>
        <meta name="description" content="Forgot Password form" />
      </Head>
      <ForgotPasswordScreen />
    </>
  );
}

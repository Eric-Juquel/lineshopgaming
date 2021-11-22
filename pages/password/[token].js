import Head from 'next/head';
import NewPasswordScreen from '../../components/auth/NewPasswordScreen';

export default function resetPasswordPage() {
  return (
    <>
      <Head>
        <title>Lineshop | Reset Password</title>
        <meta name="description" content="Reset Password form" />
      </Head>
      <NewPasswordScreen />
    </>
  );
}

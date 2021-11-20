import Head from 'next/head';
import ErrorComponent from '../components/ui/ErrorComponent';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Lineshop Gaming | Not Found</title>
      </Head>
      <ErrorComponent err="Sorry, the page you are looking for does not exist." />
    </>
  );
}

import Head from 'next/head';
import ErrorComponent from '../components/ui/ErrorComponent';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Lineshop Gaming | Not Found</title>
      </Head>
      <ErrorComponent err='Sorry, the page you are looking for does not exist.' />
    </>
  );
};

export default NotFound;

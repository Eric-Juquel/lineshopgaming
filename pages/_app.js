import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.scss';

import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Layout>
      <Head>
        <title>LineShop Gaming</title>
        <meta
          name="description"
          content="Find the last video games for all plateform and the most recents consoles at the best price. "
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta property="og:image" content="/images/logo/logo2.png" />
        <link rel="icon" href="/logo111.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);

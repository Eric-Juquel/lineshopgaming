import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.scss';
import { Provider } from 'next-auth/client';

import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Provider session={session}>
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
          {/* <link rel="stylesheet" href='https://fonts.googleapis.com/css2?family=Audiowide&family=Montserrat&family=Roboto&display=swap'/> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Audiowide&family=Megrim&family=Montserrat&family=Roboto&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);

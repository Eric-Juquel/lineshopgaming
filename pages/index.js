import fs from 'fs/promises';
import path from 'path';

import Head from 'next/head';
import Carousel3d from '../components/layout/carousel/Carousel3d';

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>Welcome to Lineshop Gaming</title>
        <meta
          name="description"
          content="Find the latest video games for all platforms and the most recents consoles at the best price. "
        />
      </Head>

      <Carousel3d images={props.images} />
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'carousel-data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      images: data.games,
    },
  };
}

import dbConnect from '../../config/dbConnect';
import Product from '../../models/product';
import Head from 'next/head';
import ProductsGallery from '../../components/products/ProductsGallery';

const GalleryPage = ({ topRatedProducts }) => {
  return (
    <>
      <Head>
        <title>LineShop | Gallery</title>
        <meta name="description" content="View our 14 most popular products " />
      </Head>
      <ProductsGallery products={topRatedProducts} />
    </>
  );
};

export const getStaticProps = async () => {
  dbConnect();

  const data = await Product.find({}).sort({ rating: -1 }).limit(14);

  const topRatedProducts = JSON.parse(JSON.stringify(data));

  return {
    props: { topRatedProducts },
    revalidate: 600,
  };
};

export default GalleryPage;

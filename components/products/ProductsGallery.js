import { useEffect } from 'react';
import classes from './ProductsGallery.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Spinner from '../ui/Spinner';
import ErrorComponent from '../ui/ErrorComponent';
// import { listTopProducts } from "../../actions/productActions";

const ProductsGallery = ({ products }) => {
  // const gridPlaces = [
  //   { gridRow: '1 / span 2', gridColumn: '1 / span 3' },
  //   { gridRow: '3 / span 1', gridColumn: '11 / span 1' },
  //   { gridRow: '4 / span 2', gridColumn: '10 / span 2' },
  //   { gridRow: '1 / span 3', gridColumn: '5 / span 3' },
  //   { gridRow: '3 / span 3', gridColumn: '12 / span 3' },
  //   { gridRow: '2 / span 1', gridColumn: '4 / span 1' },
  //   { gridRow: '4 / span 2', gridColumn: '5 / span 2' },
  //   { gridRow: '4 / span 2', gridColumn: '7 / span 3' },
  //   { gridRow: '1 / span 3', gridColumn: '8 / span 3' },
  //   { gridRow: '1 / span 2', gridColumn: '13 / span 2' },
  //   { gridRow: '1 / span 2', gridColumn: '11 / span 2' },
  //   { gridRow: '3 / span 2', gridColumn: '3 / span 2' },
  //   { gridRow: '3 / span 2', gridColumn: '1 / span 2' },
  // ];

  return (
    <div className="galleryContainer">
      <div className="gallery">
        {!products ? (
          <h2>No Products in store.</h2>
        ) : (
          <>
            <div className="gallery__title">
              <h1>Top 14 products</h1>
            </div>
            {products.map((product, index) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <a className={`gallery__item gallery__item--${index}`}>
                  <img
                    src={product.image.url || product.image  }
                    alt={product.name}
                    className="gallery__img"
                  />
                  
                </a>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsGallery;

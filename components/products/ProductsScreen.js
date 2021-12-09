import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import classes from './ProductsScreen.module.scss';

import ProductCard from './ProductCard';
import Spinner from '../ui/Spinner';

import Paginate from '../ui/Paginate';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import router from 'next/router';

const ProductScreen = () => {
  const router = useRouter();
  const containerRef = useRef(null);

  const [category, setCategory] = useState('');

  const {
    products,
    resPerPage,
    productsCount,
    filteredProductsCount,
    currentPage,
    numOfPages,
    loading,
    error,
  } = useSelector((state) => state.productsList);

  useEffect(() => {
    toast.error(error);

    if (category) {
      router.push(`/products?category=${category}`);
      scrollToTopHandler();
    }
  }, [error, category]);

  const scrollToTopHandler = () => {
    setTimeout(() => {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  return (
    <div className={classes.container}>
      <div className={classes.cardsContainer} ref={containerRef}>
        {loading ? (
          <div className={classes.centerSpinner}>
            <Spinner />
          </div>
        ) : products && products.length === 0 ? (
          <div className={classes.noProduct}>
            <h4>No Product Found.</h4>
          </div>
        ) : (
          products &&
          products.map((product) => (
            <div key={product._id} className={classes.cardContainer}>
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
      <section className={classes.pageActions}>
        <button
          className={router.query.category === 'Console' ? classes.active : ''}
          onClick={() => {
            setCategory('Console');
          }}
        >
          Consoles
        </button>

        <div className={classes.paginate}>
          <Paginate
            label="products"
            pages={numOfPages}
            page={currentPage}
            itemsPerPage={resPerPage}
            totalItems={productsCount}
            scrollToTop={scrollToTopHandler}
          />
        </div>

        <button
          className={router.query.category === 'Game' ? classes.active : ''}
          onClick={() => {
            setCategory('Game');
          }}
        >
          Games
        </button>
      </section>
    </div>
  );
};

export default ProductScreen;

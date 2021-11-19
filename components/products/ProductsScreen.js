import { useEffect, useRef } from 'react';

import classes from './ProductsScreen.module.scss';

import ProductCard from './ProductCard';
import Spinner from '../ui/Spinner';

import Paginate from './Paginate';

import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ProductScreen = () => {
  const containerRef = useRef(null);

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
  }, [error]);

  const scrollToTopHandler = () => {
    setTimeout(() => {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
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
      <div className={classes.paginate}>
        <Paginate
          pages={numOfPages}
          page={currentPage}
          itemsPerPage={resPerPage}
          totalItems={productsCount}
          scrollToTop={scrollToTopHandler}
        />
      </div>
    </div>
  );
};

export default ProductScreen;

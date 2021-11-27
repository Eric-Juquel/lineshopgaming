import { useEffect } from 'react';
import Link from 'next/link';
import FlipCard from './FlipCard';
import classes from './ProductCard.module.scss';
import Rating from '../ui/Rating';

import Cookies from 'js-cookie';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const { _id, name, rating, price, countInStock } = product;

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 },{ sameSite:'strict' });
  }, [cartItems]);

  const addToCartHandler = (productId, qty) => {
    dispatch(addToCart(productId, qty));
  };


  return (
    <div className={classes.card}>
      <div className={classes.title}>
        <Link href={`/products/${_id}`}>
          <a>
            <h3>{name}</h3>
          </a>
        </Link>
      </div>
      <div className={classes.flipCard}>
        <Link href={`/products/${_id}`}>
          <a>
            <FlipCard product={product} />
          </a>
        </Link>
      </div>
      <div className={classes.detail}>
        <p className={classes.price}>
          {price}
          {' €'}
        </p>
        <hr />
        <p className={classes.stock}>
          {countInStock === 0 ? 'Out of stock' : `${countInStock} in stock`}
        </p>
        <hr />
        <div className={classes.rating}>
          <Rating
            value={rating}
            text={` (${product.numReviews})`}
            color={'yellow'}
          />
        </div>
      </div>

      <button
        className={classes.btn}
        disabled={countInStock === 0}
        onClick={() => addToCartHandler(_id, 1)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;

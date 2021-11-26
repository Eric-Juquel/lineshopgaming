import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import classes from './ProductDetails.module.scss';

import Moment from 'react-moment';
import { IoIosReturnLeft } from 'react-icons/io';
import { toast } from 'react-toastify';

import ProductReviewForm from './ProductReviewForm';
import Rating from '../ui/Rating';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { clearErrors } from '../../redux/actions/productActions';

import Cookies from 'js-cookie';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const router = useRouter();

  const [addReview, setAddReview] = useState(false);
  const [qty, setQty] = useState(1);

  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.loadedUser);
  const { message, error: reviewError } = useSelector(
    (state) => state.productReview
  );
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    Cookies.set(
      'cartItems',
      JSON.stringify(cartItems),
      { expires: 7 },
      { sameSite: 'strict' }
    );

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      router.push(`/products/${product._id}`);
    }
  }, [dispatch, message, reviewError, error, cartItems]);

  const scrollToTopHandler = () => {
    containerRef.current.scrollTo({ top: 0 });
  };

  const goBackHandler = () => {
    setAddReview(false);
    router.back();
  };

  let alreadyReviewed = false;
  if (product && user) {
    const userReviewed = product.reviews.map((r) => r.user);
    if (userReviewed.includes(user._id)) {
      alreadyReviewed = true;
    }
  }

  const addToCartHandler = (productId, qty) => {
    dispatch(addToCart(productId, qty));
  };

  return (
    <>
      <Head>
        <title>{`LineShop | ${product.name}`}</title>
        <meta name="description" content="Detail about one product" />
      </Head>
      <div className={classes.container} ref={containerRef}>
        <button className={classes.btn} onClick={goBackHandler}>
          <IoIosReturnLeft />
          &nbsp;
          <span className={classes.text}>Back</span>
        </button>

        <div className={classes.image}>
          <Image
            src={product.image}
            alt={product.name}
            width={250}
            height={300}
          />
        </div>

        {addReview ? (
          <ProductReviewForm
            product={product}
            user={user}
            setAddReview={setAddReview}
          />
        ) : (
          <div className={classes.details}>
            <h1>{product.name}</h1>
            <hr />
            <Rating
              value={product.rating}
              text={` ${product.numReviews} Reviews`}
              color={'yellow'}
            />
            <hr />
            <h4>Description: </h4>
            <p>{product.description}</p>
          </div>
        )}

        {!user ? (
          <div className={classes.write}>
            <p>
              Please <Link href="/login"> Sign In </Link> to write a Review{' '}
            </p>
          </div>
        ) : addReview ? (
          ''
        ) : (
          <div className={classes.write}>
            {message ? (
              <p className={classes.message}>{message}</p>
            ) : (
              <button
                onClick={() => {
                  setAddReview(true);
                  scrollToTopHandler();
                }}
                disabled={alreadyReviewed}
              >
                {alreadyReviewed ? 'Already Reviewed' : 'Write a review'}
              </button>
            )}
          </div>
        )}

        <div className={classes.add}>
          <div className={classes.price}>
            <p>Price :</p>
            <strong>{product.price} €</strong>
          </div>
          <div className={classes.stock}>
            <p>Status :</p>
            <p>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
          </div>

          <div className={classes.qty}>
            <label htmlFor={'quantity'}>Qty :</label>
            <div className={classes.select}>
              <select
                disabled={product.countInStock === 0}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
              <span className="focus"></span>
            </div>
          </div>

          <div className={classes.addBtn}>
            <button
              onClick={() => addToCartHandler(product._id, qty)}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className={classes.reviews}>
          <h2>
            Reviews <span>({product.numReviews})</span>
          </h2>
          <div className={classes.text}>
            {!product.reviews || product.reviews.length === 0 ? (
              <p>No reviews for this article</p>
            ) : (
              product.reviews.map((review) => (
                <div key={review._id} className={classes.review}>
                  <hr />
                  <strong>
                    {review.name} -{' '}
                    <Moment format="DD/MM/YYYY">{review.createdAt}</Moment>
                  </strong>
                  <Rating value={review.rating} color={'yellow'} />
                  <p>{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

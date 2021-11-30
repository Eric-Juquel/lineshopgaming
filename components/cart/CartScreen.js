import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { IoIosReturnLeft } from 'react-icons/io';
import { GiEmptyMetalBucketHandle } from 'react-icons/gi';
import classes from './CartScreen.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';

import Cookies from 'js-cookie';

const CartScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    Cookies.set(
      'cartItems',
      JSON.stringify(cartItems),
      { expires: 7 },
      { sameSite: 'strict' }
    );
  }, [cartItems]);

  const goBackHandler = () => {
    router.back();
  };

  const addToCartHandler = (productId, qty) => {
    dispatch(addToCart(productId, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    router.push('/cart/shipping');
  };

  return (
    <div className={classes.container}>
      <div className={classes.cart}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className={classes.items}>
            <div className={classes.empty}>
              <h4>Your cart is empty</h4>
            </div>
          </div>
        ) : (
          <div className={classes.items}>
            <div className={classes.list}>
              {cartItems.map((item) => (
                <div className={classes.item} key={item.product}>
                  <div className={classes.image}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <h5>
                    <Link href={`/products/${item.product}`}>{item.name}</Link>
                  </h5>
                  <p>{item.price} €</p>
                  <div className={classes.qty}>
                    <div className={classes.select}>
                      <select
                        disabled={item.countInStock === 0}
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item.product, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                      <span className="focus"></span>
                    </div>
                  </div>
                  <GiEmptyMetalBucketHandle
                    onClick={() => removeFromCartHandler(item.product)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className={classes.checkout}>
        <div>
          <h3>Subtotal </h3>
        </div>

        <div>
          <p>Items :</p>
          <p className={classes.num}>
            {cartItems.reduce((acc, item) => acc + item.qty, 0)}
          </p>
        </div>
        <div>
          <p>Price :</p>
          <p className={classes.num}>
            {new Intl.NumberFormat().format(
              cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)
            )}{' '}
            €
          </p>
        </div>
        <div>
          <button disabled={cartItems.length === 0} onClick={checkoutHandler}>
            Proceed to Checkout
          </button>
        </div>
      </div>
      <div className={classes.shopping}>
        <Link href="/products">
          <a>
            <IoIosReturnLeft />
            Continue shopping
          </a>
        </Link>
      </div>
    </div>
  );
};

export default CartScreen;

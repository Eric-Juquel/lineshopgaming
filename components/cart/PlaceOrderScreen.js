import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import Spinner from '../ui/Spinner';
import Link from 'next/link';
import Image from 'next/image';
import classes from './PlaceOrderScreen.module.scss';
import CheckoutSteps from './CheckoutSteps';

import { useSelector, useDispatch } from 'react-redux';
import { newOrder } from '../../redux/actions/orderActions';

import Cookies from 'js-cookie';

const PlaceOrderScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.loadedUser);
  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );
  const { success, error, order } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success && order) {
      toast.success(success);
      router.push(`/auth/${order._id}`)
    }
  }, [error, success, order]);

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : itemsPrice === 0 ? 0 : 15;
  const taxPrice = addDecimals(Number(0.1 * itemsPrice).toFixed(2));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  const placeOrderHandler = async () => {
    const order = {
      user: user ? user._id : 'a0a0a0a0a0a0a0a0a0a0a0a0',
      orderItems: cartItems,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      itemsPrice: itemsPrice,
      shippingPrice: shippingPrice,
      taxPrice: taxPrice,
      totalPrice: totalPrice,
    };

    await dispatch(newOrder(order));

    console.log('result', result);

    if (!user) {
      Cookies.set(
        'placeOrder',
        JSON.stringify(result.orderId),
        { expires: 1 / 24 },
        { sameSite: 'strict' }
      );
    }
  };

  if (!user || !cartItems || !shippingAddress || !paymentMethod)
    return <Spinner />;

  return (
    <div className={classes.container}>
      <CheckoutSteps step1 step2 step3 step4 />

      <div className={classes.content}>
        <div className={classes.shipping}>
          <h2>Shipping</h2>
          <p>
            <strong>Name: </strong> {shippingAddress.firstName}{' '}
            {shippingAddress.lastName}
          </p>
          <p>
            <strong>Address: </strong>
            {shippingAddress.address}, {shippingAddress.city}{' '}
            {shippingAddress.postalCode},{' '}
            {shippingAddress.country.label.toUpperCase()}
          </p>
          <p>
            <strong>Email: </strong>
            {shippingAddress.email}
          </p>
        </div>
        <div className={classes.payment}>
          <h2>Payment Method</h2>
          <p>
            <strong>Method:</strong>
            {paymentMethod}
          </p>
        </div>
        <div className={classes.order}>
          <h2>Order Items</h2>
          <div className={classes.items}>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.product} className={classes.item}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={55}
                    height={55}
                  />
                  <Link href={`/products/${item.product}`}>
                    <a>
                      <h3>{item.name}</h3>
                    </a>
                  </Link>
                  <p>
                    {item.qty} x {item.price} € ={' '}
                    <span>
                      {new Intl.NumberFormat().format(item.qty * item.price)} €
                    </span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className={classes.summary}>
          <div className={classes.card}>
            <div>
              <h5>Order Summary</h5>
            </div>
            <div>
              <label>Items :</label>
              <p>{new Intl.NumberFormat().format(itemsPrice)} €</p>
            </div>
            <div>
              <label>Shipping :</label>
              <p>{shippingPrice} €</p>
            </div>
            <div>
              <label>Tax :</label>
              <p>{taxPrice} €</p>
            </div>
            <div>
              <label>Total :</label>
              <p className={classes.price}>
                {new Intl.NumberFormat().format(totalPrice)} €
              </p>
            </div>
            <div>
              <button
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;

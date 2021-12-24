import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import classes from './OrderScreen.module.scss';

// import { PayPalButton } from 'react-paypal-button-v2';
import StripeButton from '../ui/StripeButton';
import Spinner from '../../components/ui/Spinner';
import { IoMdFastforward } from 'react-icons/io';

import { PDFDownloadLink } from '@react-pdf/renderer';

import OrderPdfScreen from './OrderPdfScreen';

import Cookies from 'js-cookie';

import { useDispatch, useSelector } from 'react-redux';
import { deliverOrder, deleteOrder } from '../../redux/actions/orderActions';

import { CART_CLEAR_ITEMS } from '../../redux/constants/cartConstants';
import {
  ORDER_CREATE_RESET,
  ORDER_DELIVER_RESET,
} from '../../redux/constants/orderConstants';
import { toast } from 'react-toastify';
import ErrorComponent from '../ui/ErrorComponent';

const OrderScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);
  const [userOrder, setUserOrder] = useState(null);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [user, setUser] = useState(null);

  const { order, error } = useSelector((state) => state.orderDetails);

  const { order: newOrder } = useSelector((state) => state.newOrder);

  const { success, loading } = useSelector((state) => state.orderPay);
  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    (state) => state.orderDeliver
  );

  const { success: successDelete, error: errorDelete } = useSelector(
    (state) => state.orderDelete
  );

  const { user: loadedUser } = useSelector((state) => state.loadedUser);

  useEffect(() => {
    if (order) {
      setUser(order.user);
      setUserOrder(order);
    }
    if (newOrder) {
      setUserOrder(newOrder);
    }
    if (userOrder) {
      setItemsPrice(
        userOrder.orderItems.reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        )
      );
    }
    if (success && !user) {
      router.push('/cart/invoice');
    }
    if (success && user) {
      dispatch({ type: CART_CLEAR_ITEMS });
      dispatch({ type: ORDER_CREATE_RESET });
      Cookies.remove('cartItems');
      Cookies.remove('placeOrder');
      router.push(`/auth/${order._id}`);
    }

    if (successDeliver) {
      toast.success(successDeliver);
      dispatch({ type: ORDER_DELIVER_RESET });
      router.push(`/auth/${order._id}`);
    }

    if (successDelete) {
      router.back();
      toast.success(successDelete);
    }

    if (errorDelete) {
      toast.error(errorDelete);
    }
  }, [
    order,
    newOrder,
    userOrder,
    success,
    successDeliver,
    successDelete,
    errorDelete,
  ]);

  const payHandler = () => {
    console.log('success');
  };

  const deliverHandler = (orderID) => {
    dispatch(deliverOrder(orderID));
  };

  const deleteHandler = (orderID) => {
    dispatch(deleteOrder(orderID));
  };

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (error) return <ErrorComponent err={error} />;

  return (
    <div className={classes.container}>
      <h1>
        Order <span>{userOrder._id}</span>
      </h1>
      <div className={classes.content}>
        <div className={classes.shipping}>
          <h2>Shipping</h2>
          <div className={classes.contact}>
            <strong>Contact: </strong>{' '}
            {user ? user.firstName : userOrder.shippingAddress.firstName}{' '}
            {user ? user.lastName : userOrder.shippingAddress.lastName}
            <a
              href={`mailto:${
                user ? user.email : userOrder.shippingAddress.email
              }`}
              title="send email"
            >
              {user ? user.email : userOrder.shippingAddress.email}
            </a>
          </div>
          <div className={classes.address}>
            <strong>Address: </strong>
            {userOrder.shippingAddress.address},{' '}
            {userOrder.shippingAddress.city}{' '}
            {userOrder.shippingAddress.postalCode},{' '}
            {userOrder.shippingAddress.country.label.toUpperCase()}
          </div>
          {userOrder.isDelivered ? (
            <div className={classes.statusSuccess}>
              Delidery on &nbsp;
              <Moment format="DD/MM/YY">{userOrder.deliveredAt}</Moment>
            </div>
          ) : (
            <div className={classes.statusDanger}>
              {loadingDeliver ? <Spinner /> : 'Not Delivered'}
            </div>
          )}
        </div>
        <div className={classes.payment}>
          <h2>Payment Method</h2>
          <p>
            <strong>Method:</strong>
            {userOrder.paymentMethod}
          </p>
          {userOrder.isPaid || success ? (
            <div className={classes.statusSuccess}>
              Paid on &nbsp;
              <Moment format="DD/MM/YY">
                {userOrder.isPaid ? userOrder.paidAt : new Date()}
              </Moment>
            </div>
          ) : (
            <div className={classes.statusDanger}>Not Paid</div>
          )}
        </div>
        <div className={classes.order}>
          <h2>Order Items</h2>
          <div className={classes.items}>
            {userOrder.orderItems.length === 0 ? (
              <p>Order is empty</p>
            ) : (
              userOrder.orderItems.map((item) => (
                <div key={item.product} className={classes.item}>
                  <Image
                    src={item.image.url}
                    alt={item.name}
                    width={40}
                    height={55}
                  />
                  <Link href={`/products/${item.product}`}>
                    <a>
                      <h3>{item.name}</h3>
                    </a>
                  </Link>
                  <p>
                    <span>
                      {item.qty} x {item.price} € =
                    </span>
                    {new Intl.NumberFormat().format(item.qty * item.price)} €
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
              <p>{userOrder.shippingPrice} €</p>
            </div>
            <div>
              <label>Tax :</label>
              <p>{userOrder.taxPrice} €</p>
            </div>
            <div>
              <label>Total :</label>
              <p className={classes.total}>
                {new Intl.NumberFormat().format(userOrder.totalPrice)} €
              </p>
            </div>
          </div>
        </div>
        <div className={classes.paymentBtn}>
          {!userOrder.isPaid ? (
            userOrder.paymentMethod === 'PayPal' ? (
              <div className={classes.paypalBtn}>Paypall Button</div>
            ) : (
              <div className={classes.stripeBtn}>
                <StripeButton
                  price={userOrder.totalPrice}
                  email={userOrder.shippingAddress.email}
                  order={userOrder}
                />
                <p>Visa 4242424242424242 </p>
                <p>Any 3 digits Any future date</p>
              </div>
            )
          ) : (
            <>
              <PDFDownloadLink
                document={<OrderPdfScreen order={userOrder} />}
                fileName={`Lineshop invoice${userOrder._id}`}
              >
                {/* {({ loading }) =>
                  loading ? (
                    <div className={classes.download}>Loading</div>
                  ) : (
                    <div className={classes.download}>Download Order</div>
                  )
                } */}
                <div className={classes.download}>Download Order</div>
              </PDFDownloadLink>

              {loadedUser && loadedUser.role === 'admin' && (
                <div className={classes.adminBtn}>
                  <button
                    className={classes.backBtn}
                    onClick={() => router.back()}
                  >
                    Back
                  </button>
                  <button
                    className={classes.deliverBtn}
                    disabled={order.isDelivered}
                    onClick={() => deliverHandler(order._id)}
                  >
                    Delivered
                  </button>
                  <button
                    className={classes.deleteBtn}
                    onClick={() => deleteHandler(order._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;

import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import Link from 'next/link';
import Image from 'next/image';

import classes from './OrderScreen.module.scss';

// import { PayPalButton } from 'react-paypal-button-v2';
import StripeButton from '../ui/StripeButton';
import Spinner from '../../components/ui/Spinner';

import { PDFDownloadLink } from '@react-pdf/renderer';

import OrderPdfScreen from './OrderPdfScreen';

// import Cookies from 'js-cookie';

import { useDispatch, useSelector } from 'react-redux';

const OrderScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [userOrder, setUserOrder] = useState(null);
  const [itemsPrice, setItemsPrice] = useState(0);

  const { order } = useSelector((state) => state.orderDetails);
  const { user } = order;

  const { order: newOrder } = useSelector((state) => state.newOrder);

  const { success } = useSelector((state) => state.orderPay);

  useEffect(() => {
    if (order) {
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
  }, [order, newOrder, userOrder]);

  const payHandler = () => {
    console.log('success');
  };

  const deliverHandler = () => {
    console.log('success');
  };

  const deleteHandler = () => {
    console.log('deleted');
  };

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

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
              Not delivered
              {/* {loadingDeliver ? <Spinner /> : 'Not Delivered'} */}
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
              <Moment format="DD/MM/YY">{userOrder.isPaid ? userOrder.paidAt : new Date()}</Moment>
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
          {!userOrder.isPaid && !success ? (
            userOrder.paymentMethod === 'PayPal' ? (
              <div className={classes.paypalBtn}>Paypall Button</div>
            ) : (
              <div className={classes.stripeBtn}>
                <StripeButton
                  price={userOrder.totalPrice}
                  email={userOrder.shippingAddress.email}
                  orderId={userOrder._id}
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
                {({ loading }) =>
                  loading ? (
                    'Loading'
                  ) : (
                    <div className={classes.download}>Download Order</div>
                  )
                }
              </PDFDownloadLink>

              {user && user.isAdmin && (
                <div className={classes.adminBtn}>
                  <button
                    className={classes.payBtn}
                    disabled={order.isPaid}
                    onClick={payHandler}
                  >
                    Paid
                  </button>
                  <button
                    className={classes.deliverBtn}
                    disabled={order.isDelivered}
                    onClick={deliverHandler}
                  >
                    Delivered
                  </button>
                  <button className={classes.deleteBtn} onClick={deleteHandler}>
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

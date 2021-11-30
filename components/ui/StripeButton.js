import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import StripeCheckout from 'react-stripe-checkout';
import Modal from './Modal';
import { PDFViewer } from '@react-pdf/renderer';
import OrderPdfScreen from '../order/OrderPdfScreen';
import classes from '../order/OrderScreen.module.scss';

import { useDispatch } from 'react-redux';
import { payOrder } from '../../redux/actions/orderActions';

import Cookies from 'js-cookie';
import { CART_CLEAR_ITEMS } from '../../redux/constants/cartConstants';
import { ORDER_CREATE_RESET } from '../../redux/constants/orderConstants';

const StripeButton = ({ price, email, order }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Modal
  const modalRef = useRef();

  const [session] = useSession();

  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51IEAPiDtfwWjTe2zQakBH416tdNbfW2Ys1rPVO9KZECDmb5IiloffWlBHxwwmZxZ9vCGR8fx6XzpBm45EICiYyGZ00X5AODGAa';

  const onToken = (token) => {
    dispatch(payOrder(order._id));

    if (session) {
      dispatch({ type: CART_CLEAR_ITEMS });
      dispatch({ type: ORDER_CREATE_RESET });
      router.push(`/auth/${order._id}`);
    } else {
      modalRef.current.openModal();
    }
  };

  const backHomeHandler = () => {
    router.push('/');
    Cookies.remove('cartItems');
    Cookies.remove('shippingAddress');
    Cookies.remove('paymentMethod');
    Cookies.remove('placeOrder');
    dispatch({ type: CART_CLEAR_ITEMS });
    dispatch({ type: ORDER_CREATE_RESET });
    modalRef.current.closeModal();
  };

  return (
    <>
      <StripeCheckout
        label="Pay Now"
        name="LineShop Gaming"
        image="https://res.cloudinary.com/ericjuquel94/image/upload/v1637593348/LineShop/logos/logo2_c2s6g8.png"
        shippingAddress
        billingAddress
        email={email}
        description={`Your total is ${price} €`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
      />
      <Modal ref={modalRef} height="100%" wifth="100%">
        <div className={classes.invoice}>
          <PDFViewer width="80%" height="80%">
            <OrderPdfScreen order={order} />
          </PDFViewer>
          <div className={classes.quitInvoice}>
            <h5>
              Download or print this invoice before leaving this page, you won't
              be able to do it again{' '}
            </h5>
            <button onClick={backHomeHandler}>Back Home</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default StripeButton;

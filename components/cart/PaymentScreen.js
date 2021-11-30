import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classes from './PaymentScreen.module.scss';
import CheckoutSteps from './CheckoutSteps';
import Cookies from 'js-cookie';

import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod } from '../../redux/actions/cartActions';

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { paymentMethod } = useSelector((state) => state.cart);

  const [payment, setPayment] = useState(
    paymentMethod ? paymentMethod : 'Stripe'
  );

  useEffect(() => {
    Cookies.set('paymentMethod', JSON.stringify(paymentMethod), {
      expires: 1 / 24,
    },{sameSite:"strict"});
  }, [paymentMethod]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(payment));
    router.push('/cart/placeOrder');
  };

  return (
    <div className={classes.container}>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <h2>Select Method</h2>
        <div className={classes.radioGroup}>
          <input
            type="radio"
            className={classes.input}
            id="paypal"
            name="payment"
            value="PayPal"
            checked={payment === 'PayPal'}
            disabled
            onChange={(e) => setPayment(e.target.value)}
          />
          <label htmlFor="paypal" className={classes.label}>
            <span className={classes.radioButton}></span>
            PayPal (currently not available)
          </label>
        </div>
        <div className={classes.radioGroup}>
          <input
            type="radio"
            className={classes.input}
            id="stripe"
            name="payment"
            value="Stripe"
            checked={payment === 'Stripe'}
            onChange={(e) => setPayment(e.target.value)}
          />
          <label htmlFor="stripe" className={classes.label}>
            <span className={classes.radioButton}></span>
            Stripe
          </label>
        </div>
        <div className={classes.continue}>
          <button className={classes.btn} type="submit">
            <span className={classes.btn__visible}>Continue</span>
            <span className={classes.btn__invisible}>Place Order</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentScreen;

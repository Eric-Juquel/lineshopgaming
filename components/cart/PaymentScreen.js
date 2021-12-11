import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classes from './PaymentScreen.module.scss';

import { useForm } from 'react-hook-form';
import RadioBtn from '../forms/RadioBtn';

import CheckoutSteps from './CheckoutSteps';
import Cookies from 'js-cookie';

import { useSelector, useDispatch } from 'react-redux';
import { savePaymentMethod } from '../../redux/actions/cartActions';

const PaymentScreen = ({ paymentOptions }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const { paymentMethod } = useSelector((state) => state.cart);

  useEffect(() => {
    Cookies.set(
      'paymentMethod',
      JSON.stringify(paymentMethod),
      {
        expires: 1 / 24,
      },
      { sameSite: 'strict' }
    );
  }, [paymentMethod]);

  const submitHandler = (data) => {
    dispatch(savePaymentMethod(data.paymentMethod));
    router.push('/cart/placeOrder');
  };

  return (
    <div className={classes.container}>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <h2>Select Method</h2>
        <div className={classes.radioGroup}>
          {paymentOptions.map((payment) => {
            console.log('payment', payment);
            return (
              <RadioBtn
                key={payment}
                register={register}
                name="paymentMethod"
                value={payment}
                label={payment}
                checked={paymentMethod === payment}
                disabled={payment === 'Paypal'}
                message={
                  payment === 'Paypal'
                    ? 'Paypal is is temporarily deactivated'
                    : null
                }
              />
            );
          })}
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

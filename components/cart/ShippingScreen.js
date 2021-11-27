import { useState, useEffect } from 'react';
import classes from './ShippingScreen.module.scss';

import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import countryList from 'react-select-country-list';
import TextField from '../forms/TextField';
import SelectField from '../forms/SelectField';
import CheckoutSteps from './CheckoutSteps';

import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddress } from '../../redux/actions/cartActions';

import Cookies from 'js-cookie';

const ShippingScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState();
  const [message, setMessage] = useState(null);

  const { shippingAddress } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.loadedUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const countriesOption = countryList().getData();

  useEffect(() => {
    Cookies.set(
      'shippingAddress',
      JSON.stringify(shippingAddress),
      { expires: 7 },
      { sameSite: 'strict' }
    );
  }, [shippingAddress]);

  useEffect(() => {
    if (errors && Object.entries(errors).length > 0) {
      for (const value in errors) {
        if (errors[value].type === 'required') {
          setMessage('All fields are required');
        }
      }
    } else {
      setMessage(null);
    }
  }, [Object.entries(errors).length]);

  const onSubmit = async (data) => {

    await dispatch(
      saveShippingAddress({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
      })
    );

    router.push('/cart/payment');
  };

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={classes.container}>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <div className={classes.message}>{message && <p>{message}</p>}</div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.formGroup}>
          <TextField
            type="text"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="First Name"
            name="firstName"
            placeholder="Enter First name"
            defaultValue={
              shippingAddress && shippingAddress.firstName
                ? shippingAddress.firstName
                : user
                ? user.firstName
                : ''
            }
            mandatory={true}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            type="text"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Last Name"
            name="lastName"
            placeholder="Enter Last name"
            defaultValue={
              shippingAddress && shippingAddress.lastName
                ? shippingAddress.lastName
                : user
                ? user.lastName
                : ''
            }
            mandatory={true}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            type="email"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Email"
            name="email"
            placeholder="Email"
            defaultValue={
              shippingAddress && shippingAddress.email
                ? shippingAddress.email
                : user
                ? user.email
                : ''
            }
            mandatory={true}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            type="text"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Address"
            name="address"
            placeholder="Enter Address"
            defaultValue={shippingAddress ? shippingAddress.address : ''}
            mandatory={true}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            type="text"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="City"
            name="city"
            placeholder="Enter City"
            defaultValue={shippingAddress ? shippingAddress.city : ''}
            mandatory={true}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            type="text"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Postal Code"
            name="postalCode"
            placeholder="Enter Postal Code"
            defaultValue={shippingAddress ? shippingAddress.postalCode : null}
            mandatory={true}
          />
        </div>
        <div className={classes.formGroup}>
          <SelectField
            control={control}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Country"
            name="country"
            placeholder="Enter Country"
            options={countriesOption}
            menuPlacement="top"
            isMulti={false}
            defaultValue={shippingAddress ? shippingAddress.country : null}
            mandatory={true}
          />
        </div>
        <div className={classes.continue}>
          <button className={classes.btn} type="submit">
            <span className={classes.btn__visible}>Continue</span>
            <span className={classes.btn__invisible}>Payment</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingScreen;

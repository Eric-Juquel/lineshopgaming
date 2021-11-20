import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

import classes from './RegisterScreen.module.scss';
import { useForm } from 'react-hook-form';
import TextField from '../forms/TextField';
import { toast } from 'react-toastify';
import Spinner from '../ui/Spinner';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '../../redux/actions/userActions';

const RegisterScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);

  const { success, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      router.push('/login');
    }
    if (error) {
      setMessage(() => ({ status: 'error', text: error }));
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, success, error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setMessage(() => ({ status: 'error', text: 'Passwords do not match' }));
      toast.error(error);
      dispatch(clearErrors());
    } else {
      dispatch(registerUser(data));
    }
  };

  return (
    <div className={classes.container}>
      <h1>Sign Up</h1>
      <div className={classes.message}>
        {message && <p className={message.status}>{message.text}</p>}
      </div>
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
            placeholder="First Name"
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
            placeholder="Last Name"
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
            mandatory={true}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            type="password"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Password"
            name="password"
            placeholder="Password"
            mandatory={true}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.empty}`}></div>
        <div className={classes.formGroup}>
          <TextField
            type="password"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
            mandatory={true}
          />
        </div>

        <button
          className={classes.signupBtn}
          type="submit"
          disabled={loading ? true : false}
        >
          {loading ? <Spinner /> : 'REGISTER'}
        </button>
        <div className={classes.account}>
          <p>
            Have an Account ? <Link href="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterScreen;

import { useEffect } from 'react';
import classes from './LoginScreen.module.scss';

import { useForm } from 'react-hook-form';

import TextField from '../forms/TextField';
import Spinner from '../ui/Spinner';
import { toast } from 'react-toastify';

import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors } from '../../redux/actions/userActions';

const NewPasswordScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { error, loading, success } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      router.push('/login');
    }
  }, [dispatch, error, success]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    dispatch(resetPassword(router.query.token, data));
  };

  return (
    <div className={classes.container}>
      <h1>New Password</h1>
      <div className={classes.message}>{error && <p>{error}</p>}</div>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
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
          className={classes.forgotBtn}
          type="submit"
          disabled={loading ? true : false}
        >
          {loading ? <Spinner /> : 'SET PASSWORD'}
        </button>
      </form>
    </div>
  );
};

export default NewPasswordScreen;

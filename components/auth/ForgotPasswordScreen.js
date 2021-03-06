import { useEffect } from 'react';
import classes from './LoginScreen.module.scss';

import { useForm } from 'react-hook-form';

import TextField from '../forms/TextField';
import Spinner from '../ui/Spinner';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearErrors } from '../../redux/actions/userActions';

const ForgotPasswordScreen = () => {
  const dispatch = useDispatch();

  const { error, loading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    dispatch(forgotPassword(data));
  };

  return (
    <div className={classes.container}>
      <h1>Forgot Password</h1>
      <p >This component use my mailtrap.io testing on demo and will not send you any email.</p>
      <div className={classes.message}>{error && <p>{error}</p>}</div>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
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
        <button
          className={classes.forgotBtn}
          type="submit"
          disabled={loading ? true : false}
        >
          {loading ? <Spinner /> : 'SEND EMAIL'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;

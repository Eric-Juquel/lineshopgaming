import { useState } from 'react';
import classes from './LoginScreen.module.scss';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

import Link from 'next/link';
import TextField from '../forms/TextField';
import Spinner from '../ui/Spinner';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const router = useRouter();

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    setLoading(true);

    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (!result.error) {
      router.push('/products');
    } else {
      toast.error(result.error);
      setMessage(result.error);
    }
  };

  return (
    <div className={classes.container}>
      <h1>Sign In</h1>

      <div className={classes.message}>{message && <p>{message}</p>}</div>
      <div className={classes.forgot}>
        <Link href="/password">Forgot Password ? </Link>
      </div>
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

        <button type="submit" disabled={loading ? true : false}>
          {loading ? <Spinner /> : 'LOGIN'}
        </button>
        <div className={classes.new}>
          <p>
            New Customer ? <Link href="/register">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;

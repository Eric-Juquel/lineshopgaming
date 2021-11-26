import Link from 'next/link';
import classes from './CheckoutSteps.module.scss';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className={classes.navigation}>
      <ul className={classes.list}>
        <li className={classes.item}>
          {step1 ? (
            <Link className={classes.link} href="/login">
              Sign In
            </Link>
          ) : (
            <Link className={classes.link}>
              <a disabled>Sign In</a>
            </Link>
          )}
        </li>
        <hr disabled={!step2} />
        <li className={classes.item}>
          {step2 ? (
            <Link className={classes.link} href="/cart/shipping">
              Shipping
            </Link>
          ) : (
            <Link className={classes.link} href="#">
              <a disabled>Shipping</a>
            </Link>
          )}
        </li>
        <hr disabled={!step3} />
        <li className={classes.item}>
          {step3 ? (
            <Link className={classes.link} href="/cart/payment">
              Payment
            </Link>
          ) : (
            <Link className={classes.link} href="#">
              <a disabled>Payment</a>
            </Link>
          )}
        </li>
        <hr disabled={!step4} />
        <li className={classes.item}>
          {step4 ? (
            <Link className={classes.link} href="/cart/placeorder">
              Place Order
            </Link>
          ) : (
            <Link className={classes.link} href="#">
              <a disabled>Place Order</a>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default CheckoutSteps;

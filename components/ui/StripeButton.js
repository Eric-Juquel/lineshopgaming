import StripeCheckout from 'react-stripe-checkout';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';
import { payOrder } from '../../redux/actions/orderActions';

const StripeButton = ({ price, email, orderId }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51IEAPiDtfwWjTe2zQakBH416tdNbfW2Ys1rPVO9KZECDmb5IiloffWlBHxwwmZxZ9vCGR8fx6XzpBm45EICiYyGZ00X5AODGAa';

  const onToken = (token) => {
    console.log(token);
    dispatch(payOrder(orderId));

    router.push(`/auth/${orderId}`);
  };

  return (
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
  );
};

export default StripeButton;

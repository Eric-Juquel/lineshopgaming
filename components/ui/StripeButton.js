import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import StripeCheckout from 'react-stripe-checkout';

import { useDispatch } from 'react-redux';
import { payOrder } from '../../redux/actions/orderActions';
import { CART_CLEAR_ITEMS } from '../../redux/constants/cartConstants';
import { ORDER_CREATE_RESET } from '../../redux/constants/orderConstants';

const StripeButton = ({ price, email, order }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [session] = useSession();

  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51IEAPiDtfwWjTe2zQakBH416tdNbfW2Ys1rPVO9KZECDmb5IiloffWlBHxwwmZxZ9vCGR8fx6XzpBm45EICiYyGZ00X5AODGAa';

  const onToken = (token) => {
    dispatch(payOrder(order._id));
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
    </>
  );
};

export default StripeButton;

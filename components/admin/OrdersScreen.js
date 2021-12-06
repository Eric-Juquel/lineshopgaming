import { useEffect } from 'react';

import classes from '../auth/ProfileScreen.module.scss';
import ProfileOrders from '../auth/ProfileOrders';
import Spinner from '../ui/Spinner';

import { useDispatch, useSelector } from 'react-redux';

import { listOrders } from '../../redux/actions/orderActions';
import { toast } from 'react-toastify';

const OrdersScreen = () => {
  const dispatch = useDispatch();

  const { orders, error, loading } = useSelector((state) => state.ordersList);

  useEffect(() => {
    dispatch(listOrders());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className={classes.container}>
      <h1>Orders</h1>
      {loading ? <Spinner /> : <ProfileOrders orders={orders} />}
    </div>
  );
};

export default OrdersScreen;

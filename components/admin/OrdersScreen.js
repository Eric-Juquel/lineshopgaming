import { useEffect } from 'react';

import classes from './AdminScreen.module.scss';
import Spinner from '../ui/Spinner';

import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import AdminTable from './AdminTable';

const OrdersScreen = () => {
  const dispatch = useDispatch();

  const {
    orders,
    resPerPage,
    ordersCount,
    currentPage,
    numOfPages,
    error,
    loading,
  } = useSelector((state) => state.ordersList);

  const raws = orders.map((order) => {
    return [
      { key: 'id', type: 'string', label: 'ID', value: order._id },
      {
        key: 'name',
        type: 'string',
        label: 'NAME',
        value: `${order.user.firstName} ${order.user.lastName}`,
      },
      { key: 'createdAt', type: 'date', label: 'DATE', value: order.createdAt },
      { key: 'price', type: 'price', label: 'TOTAL', value: order.totalPrice },
      {
        key: 'paidAt',
        type: 'checkDate',
        label: 'PAID',
        check: order.isPaid,
        value: order.paidAt,
      },
      {
        key: 'deliveredAt',
        type: 'checkDate',
        label: 'DELIVERED',
        check: order.isDelivered,
        value: order.deliveredAt,
      },
    ];
  });

  const ordersTableFormat = {
    title: 'orders',
    link: 'auth',
    raws,
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className={classes.container}>
      <h1>Orders</h1>
      <div className={classes.orders}>
        {loading ? (
          <Spinner />
        ) : (
          <AdminTable
            items={ordersTableFormat}
            label="orders"
            resPerPage={resPerPage}
            itemsCount={ordersCount}
            currentPage={currentPage}
            numOfPages={numOfPages}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersScreen;

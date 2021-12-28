import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './AdminScreen.module.scss';
import Spinner from '../ui/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/actions/orderActions';

import { toast } from 'react-toastify';
import AdminTable from './AdminTable';

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState(-1);

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
        key: 'user',
        type: 'string',
        label: 'NAME',
        value: `${order.user.firstName} ${order.user.lastName}`,
      },
      { key: 'createdAt', type: 'date', label: 'DATE', value: order.createdAt },
      {
        key: 'totalPrice',
        type: 'price',
        label: 'TOTAL',
        value: order.totalPrice,
      },
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
    if (sort && order) {
      console.log('sort', sort, order);
      router.push(`/admin/orders?sort=${sort}&order=${order}`);
    }
  }, [dispatch, error, sort, order]);

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
            setSort={setSort}
            sort={sort}
            order={order}
            setOrder={setOrder}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersScreen;

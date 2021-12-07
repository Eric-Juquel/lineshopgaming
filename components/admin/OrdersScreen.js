import { useEffect, useRef } from 'react';

import classes from './AdminScreen.module.scss';
import AdminOrders from './AdminOrders';
import Spinner from '../ui/Spinner';

import { useDispatch, useSelector } from 'react-redux';

import { listOrders } from '../../redux/actions/orderActions';
import { toast } from 'react-toastify';
import Paginate from '../products/Paginate';

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const {
    orders,
    resPerPage,
    ordersCount,
    currentPage,
    numOfPages,
    error,
    loading,
  } = useSelector((state) => state.ordersList);

  useEffect(() => {
    // dispatch(listOrders());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const scrollToTopHandler = () => {
    setTimeout(() => {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  return (
    <div className={classes.container} ref={containerRef}>
      <h1>Orders</h1>
      <div className={classes.orders}>
        {loading ? <Spinner /> : <AdminOrders orders={orders} />}
      </div>
      <div className={classes.paginate}>
        <Paginate
          items="orders"
          pages={numOfPages}
          page={currentPage}
          itemsPerPage={resPerPage}
          totalItems={ordersCount}
          scrollToTop={scrollToTopHandler}
        />
      </div>
    </div>
  );
};

export default OrdersScreen;

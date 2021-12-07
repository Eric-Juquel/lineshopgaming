import { useState } from 'react';
import classes from './AdminScreen.module.scss';
import Moment from 'react-moment';
import Link from 'next/link';
import { GiSplitCross } from 'react-icons/gi';

const AdminOrders = ({ orders, ref }) => {
  const [sort, setSort] = useState('');

  console.log('orders', orders);

  return (
    <div className={classes.orderTable}>
      <div className={classes.entitled}>
        <h4 className={classes.cell}>ID</h4>
        <h4 className={classes.cell} onClick={() => setSort('name')}>
          NAME
        </h4>
        <h4 className={classes.cell} onClick={() => setSort('createdAt')}>
          DATE
        </h4>
        <h4 className={classes.cell} onClick={() => setSort('totalPrice')}>
          TOTAL
        </h4>
        <h4 className={classes.cell} onClick={() => setSort('paidAt')}>
          PAID
        </h4>
        <h4 className={classes.cell} onClick={() => setSort('deliveredAt')}>
          DELIVERED
        </h4>
      </div>

      <div className={classes.items} ref={ref}>
        {orders.length === 0 ? (
          <h4>No Current Order</h4>
        ) : (
          orders.map((order) => (
            <Link href={`/auth/${order._id}`} key={order._id}>
              <a>
                <div key={order._id} className={classes.row}>
                  <div className={classes.cell}>{order._id}</div>
                  <div className={classes.cell}>
                    {order.user
                      ? `${order.user.firstName} ${order.user.lastName}`
                      : 'Not register'}
                  </div>
                  <div className={classes.cell}>
                    <Moment format="DD/MM/YY">{order.createdAt}</Moment>
                  </div>
                  <div className={classes.cell}>
                    {new Intl.NumberFormat().format(order.totalPrice)} €
                  </div>
                  <div className={classes.cell}>
                    {order.isPaid ? (
                      <Moment format="DD/MM/YY">{order.paidAt}</Moment>
                    ) : (
                      <GiSplitCross />
                    )}
                  </div>
                  <div className={classes.cell}>
                    {order.isDelivered ? (
                      <Moment format="DD/MM/YY">{order.deliveredAt}</Moment>
                    ) : (
                      <GiSplitCross />
                    )}
                  </div>
                </div>
              </a>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;

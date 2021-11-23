import { useEffect, useState } from 'react';
import classes from './ProfileScreen.module.scss';
import { toast } from 'react-toastify';

import Spinner from '../ui/Spinner';
import ProfileForm from './ProfileForm';
import ProfileOrders from './ProfileOrders';
import ProfileAdmin from './ProfileAdmin';

import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../redux/actions/userActions';
import { clearErrors } from '../../redux/actions/userActions';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.loadedUser);

  const { orders } = useSelector((state) => state.userOrders);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser())
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, user]);

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <h1>User Profile</h1>
        {loading ? <Spinner /> : user && <ProfileForm user={user} />}
      </div>
      {user && user.role === 'admin' && (
        <div className={classes.admin}>
          <h1>Admin</h1>
          <ProfileAdmin />
        </div>
      )}
      <div className={classes.orders}>
        <h1>My Orders</h1>
        <ProfileOrders orders={orders} />
      </div>
    </div>
  );
};

export default ProfileScreen;

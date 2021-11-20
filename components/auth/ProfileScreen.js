import { useEffect, useState } from 'react';
import classes from './ProfileScreen.module.scss';

import { listUserOrders, useAuth, updateUser } from '../../context/useAuth';

import Spinner from '../ui/Spinner';
import ProfileForm from './ProfileForm';
import ProfileOrders from './ProfileOrders';
import ProfileAdmin from './ProfileAdmin';

const ProfileScreen = () => {
  const [userState, userDispatch] = useAuth();
  const { user, orders, message, error } = userState;

  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (user) {
      listUserOrders(userDispatch);
    }
  }, [user]);

  const updateHandler = async (data) => {
    try {
      await updateUser(userDispatch, data);
      setAlert(() => message);
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } catch (error) {
      setAlert(error.message);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <h1>User Profile</h1>
        {!user ? (
          <Spinner />
        ) : (
          <ProfileForm
            user={user}
            updateHandler={updateHandler}
            alert={alert}
            setAlert={setAlert}
          />
        )}
      </div>
      {user && user.isAdmin && (
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

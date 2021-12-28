import { useEffect } from 'react';
import classes from './UserDetailsScreen.module.scss';

import BackBtn from '../ui/BackBtn';
import Spinner from '../ui/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/actions/userActions';
import UserCard from './UserCard';
import UserForm from './UserForm';
import { toast } from 'react-toastify';
import UserOrders from './UserOrders';
import { USER_ROLE_RESET } from '../../redux/constants/userConstants';

const UserDetailsScreen = ({ rolesOptions }) => {
  const dispatch = useDispatch();

  const { user, userOrders, loading, error } = useSelector(
    (state) => state.userDetails
  );
  const { success, error: roleError } = useSelector((state) => state.userRole);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (roleError) {
      toast.error(roleError);
    }
    if (success) {
      toast.success(success);
      dispatch(clearErrors());
      dispatch({ type: USER_ROLE_RESET });
    }
  }, [dispatch, error, roleError, success]);

  if (loading) return <Spinner />;

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <h1>User Profile</h1>
        <UserCard user={user} />
      </div>
      <div className={classes.actions}>
        
        <UserForm
          rolesOptions={rolesOptions}
          user={user}
        />
      </div>
      <div className={classes.orders}>
        <h1>Orders</h1>
        <UserOrders orders={userOrders} />
        <div className={classes.back}>
          <BackBtn />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsScreen;

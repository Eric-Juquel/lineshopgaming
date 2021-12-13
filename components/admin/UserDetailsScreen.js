import { useEffect } from 'react';
import classes from './UserDetailsScreen.module.scss';

import BackBtn from '../ui/BackBtn';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getUserDetails } from '../../redux/actions/userActions';
import UserCard from './UserCard';
import UserRoleForm from './UserRoleForm';
import { toast } from 'react-toastify';
// import { USER_UPDATE_RESET } from "../../../constants/userConstants";

const UserDetailsScreen = ({ rolesOptions }) => {
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.userDetails);
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
    }
  }, [dispatch, error, roleError, success]);

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <h1>User Profile</h1>
        <UserCard user={user} />
      </div>
      <div className={classes.role}>
        <h1>Rôle</h1>
        <UserRoleForm
          rolesOptions={rolesOptions}
          userRole={user.role}
          userID={user._id}
        />
      </div>
      <div className={classes.orders}>
        <h1>Orders</h1>
        <div className={classes.back}>
          <BackBtn />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsScreen;

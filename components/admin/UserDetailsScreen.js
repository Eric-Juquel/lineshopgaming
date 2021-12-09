import { useEffect, useState } from 'react';
import classes from './UserDetailsScreen.module.scss';
import Moment from 'react-moment';

import Image from 'next/image';

import { IoIosReturnLeft } from 'react-icons/io';

import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, clearErrors } from '../../redux/actions/userActions';
// import { USER_UPDATE_RESET } from "../../../constants/userConstants";

const UserDetailsScreen = () => {
  const dispatch = useDispatch();
  const [role, setRole] = useState('');

  const { user, loading, error } = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className={classes.container}>
      <div className={classes.profile}>
        <h1>User Profile</h1>
        <div className={classes.userCard}>
          <div className={classes.userInfo}>
            <div className={classes.raw}>
              <h6>First name:</h6>
              <p>{user.firstName}</p>
            </div>
            <div className={classes.raw}>
              <h6>last name:</h6>
              <p>{user.lastName}</p>
            </div>
            <div className={classes.raw}>
              <h6>Register:</h6>
              <p>
                <Moment format="DD/MM/YY">{user.createdAt}</Moment>
              </p>
            </div>
            <div className={classes.raw}>
              <h6>Email:</h6>
              <a href={`mailto:${user.email}`} title="send email">
                {user.email}
              </a>
            </div>
          </div>
          <div className={classes.avatar}>
            <Image src={user.avatar.url} width={80} height={90} />
          </div>
        </div>
      </div>
      <div className={classes.role}>
        <h1>Rôle</h1>
      </div>
      <div className={classes.orders}>
        <h1>Orders</h1>
      </div>
    </div>
  );
};

export default UserDetailsScreen;

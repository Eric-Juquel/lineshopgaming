import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './AdminScreen.module.scss';
import Spinner from '../ui/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/actions/userActions';

import { toast } from 'react-toastify';
import AdminTable from './AdminTable';

const UsersScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState(-1);

  const {
    users,
    resPerPage,
    usersCount,
    currentPage,
    numOfPages,
    error,
    loading,
  } = useSelector((state) => state.usersList);

  const raws = users.map((user) => {
    return [
      { key: 'id', type: 'string', label: 'ID', value: user._id },
      {
        key: 'lastName',
        type: 'string',
        label: 'NAME',
        value: `${user.firstName} ${user.lastName}`,
      },
      { key: 'createdAt', type: 'date', label: 'DATE', value: user.createdAt },
      { key: 'email', type: 'string', label: 'EMAIL', value: user.email },
      {
        key: 'role',
        type: 'role',
        label: 'ROLE',
        value: user.role,
      },
      {
        key: 'avatar',
        type: 'avatar',
        label: 'AVATAR',
        value: user.avatar
          ? user.avatar.url
          : 'https://res.cloudinary.com/ericjuquel94/image/upload/v1639416363/LineShop/avatars/default_user_orizni.png',
      },
    ];
  });

  const usersTableFormat = {
    title: 'users',
    link: 'admin/users',
    raws,
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (sort && order) {
      router.push(`/admin/users?sort=${sort}&order=${order}`);
    }
  }, [dispatch, error, sort, order]);

  return (
    <div className={classes.container}>
      <h1>Users</h1>
      <div className={classes.users}>
        {loading ? (
          <Spinner />
        ) : (
          <AdminTable
            items={usersTableFormat}
            label="users"
            resPerPage={resPerPage}
            itemsCount={usersCount}
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

export default UsersScreen;

import { useEffect } from 'react';

import classes from './AdminScreen.module.scss';
import Spinner from '../ui/Spinner';

import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import AdminTable from './AdminTable';

const UsersScreen = () => {
  const dispatch = useDispatch();

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
        key: 'name',
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
        key: 'action',
        type: 'action',
        label: 'ACTION',
        value: ['rôle', 'delete'],
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
  }, [dispatch, error]);

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
          />
        )}
      </div>
    </div>
  );
};

export default UsersScreen;

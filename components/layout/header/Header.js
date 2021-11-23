import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';

import classes from './Header.module.scss';

import Logo from './Logo';
import Navigation from './Navigation';
import Searchbar from './Searchbar';
import UserActions from './UserActions';

import { useDispatch, useSelector } from 'react-redux';
import { loadUser, clearErrors } from '../../../redux/actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const [session] = useSession();

  const [user, setUser] = useState();

  // const { user, loading } = useSelector((state) => state.loadedUser);

  // useEffect(() => {
  //   if (session && session.user && !user) {
  //     dispatch(loadUser());
  //   }
  // }, [dispatch, session, user]);

  useEffect(() => {
    if (session && session.user) {
      setUser(() => session.user);
    }
  }, [session]);

  return (
    <header className="header">
      <div className={classes.container}>
        <div className={classes.logo}>
          <Logo />
        </div>

        <div className={classes.navigation}>
          <Navigation />
        </div>

        <div className={classes.searchbar}>
          <Searchbar />
        </div>

        <div className={classes.userActions}>
          <UserActions user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;

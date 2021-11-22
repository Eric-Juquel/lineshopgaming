import { useEffect } from 'react';
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

  const { user, loading } = useSelector((state) => state.loadedUser);

  console.log('user', user, 'session', session, 'router');

  useEffect(() => {
    if (session && !user) {
      dispatch(loadUser());
    }
  }, [ dispatch,session, user]);

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

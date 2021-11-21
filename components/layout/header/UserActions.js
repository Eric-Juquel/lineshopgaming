import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

import Link from 'next/link';
import Image from 'next/image';
import classes from './UserActions.module.scss';
import BurgerNavigation from './BurgerNavigation';

import { useDispatch, useSelector } from 'react-redux';
import { loadUser, clearErrors } from '../../../redux/actions/userActions';

const UserActions = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [session] = useSession();

  const { user, loading } = useSelector((state) => state.auth);

  // const getPublicId = (url) => {
  //   const parts = url.split("/");
  //   return parts[parts.length - 1];
  // }

  const [active, setActive] = useState('');

  useEffect(() => {
    setActive(router.pathname);

    if (session && session.user && !user) {
      dispatch(loadUser());
    }
  }, [router, dispatch, user]);

  return (
    <div className={classes.actionContainer}>
      <div className={classes.userCart}>
        <Link href="/cart">
          <a>
            <Image
              src="/images/icones/marketplace-drawing-clipart-4.png"
              alt="cart"
              width={35}
              height={25}
            />
            {/* {cartItems && (
              <div className={classes.qty}>
                {' '}
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </div>
            )} */}
          </a>
        </Link>
      </div>

      {!user ? (
        <nav className={classes.navigation}>
          <ul className={classes.list}>
            <li
              className={`${classes.item} ${classes.desktop}  ${
                active === '/register' && classes.active
              }`}
            >
              <Link className={classes.link} href="/register">
                REGISTER
              </Link>
            </li>
            <li
              className={`${classes.item} ${classes.desktop}  ${
                active === '/login' && classes.active
              }`}
            >
              <Link className={classes.link} href="/login">
                LOGIN
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <div className={classes.userLoged}>
          <nav className={classes.navigation}>
            <ul className={classes.list}>
              <li
                className={`${classes.item} ${classes.desktop}  ${
                  active === '/auth/logout' && classes.active
                }`}
              >
                <Link className={classes.link} href="/auth/logout">
                  Logout
                </Link>
              </li>
              <li
                className={`${classes.item} ${classes.desktop}  ${
                  active === '/auth/profile' && classes.active
                }`}
              >
                <Link className={classes.link} href="/auth/profile">
                  {user.firstName}
                </Link>
              </li>
            </ul>
          </nav>
          <Link className={classes.link} href="/auth/profile">
            <div className={classes.avatar}>
              {user && user.avatar ? (
                <Image
                  src={user.avatar.url}
                  alt={`${user.name}'s avatar`}
                  width={55}
                  height={55}
                />
              ) : (
                <div className={classes.noAvatar}>
                  {user.firstName.substring(0, 1)}
                </div>
              )}
            </div>
          </Link>
        </div>
      )}

      <div className={classes.burger}>
        <BurgerNavigation />
      </div>
    </div>
  );
};

export default UserActions;

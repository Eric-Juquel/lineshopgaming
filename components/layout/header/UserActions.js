import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import Image from 'next/image';
import classes from './UserActions.module.scss';
import BurgerNavigation from './BurgerNavigation';

import { useSelector } from 'react-redux';

const UserActions = ({ user }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  // const getPublicId = (url) => {
  //   const parts = url.split("/");
  //   return parts[parts.length - 1];
  // }

  const [active, setActive] = useState('');

  useEffect(() => {
    setActive(router.pathname);
  }, [router]);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className={classes.actionContainer}>
      <div className={classes.userCart}>
        <Link href="/cart">
          <a>
            <Image
              src="https://res.cloudinary.com/ericjuquel94/image/upload/v1637593378/LineShop/logos/marketplace-drawing-clipart-4_zdj8gn.png"
              alt="cart"
              width={35}
              height={25}
            />
            {cartItems && (
              <div className={classes.qty}>
                {' '}
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </div>
            )}
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
                  <a>{user.firstName}</a>
                </Link>
              </li>
            </ul>
          </nav>
          <Link className={classes.link} href="/auth/profile">
            <a>
              <div className={classes.avatar}>
                {user && user.avatar ? (
                  <Image
                    src={user.avatar.url}
                    alt={`${user.name}'s avatar`}
                    width={55}
                    height={57}
                  />
                ) : (
                  // <div className={classes.noAvatar}>
                  //   {user.firstName.substring(0, 1)}
                  // </div>
                  <Image
                    src="https://res.cloudinary.com/ericjuquel94/image/upload/v1639416363/LineShop/avatars/default_user_orizni.png"
                    alt="default avatar"
                    width={55}
                    height={57}
                  />
                )}
              </div>
            </a>
          </Link>
        </div>
      )}

      <div className={classes.burger}>
        <BurgerNavigation user={user} />
      </div>
    </div>
  );
};

export default UserActions;

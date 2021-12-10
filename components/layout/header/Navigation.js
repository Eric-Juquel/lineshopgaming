import { useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './Navigation.module.scss';

const Navigation = ({ user, setIsChecked }) => {
  const router = useRouter();

  const [active, setActive] = useState('');

  useEffect(() => {
    setActive(router.pathname);
  }, [router]);

  return (
    <nav className={classes.navigation}>
      <ul className={classes.list}>
        <li
          className={`${classes.item} ${
            active === '/products' && classes.active
          }`}
        >
          <Link href="/products">
            <a
              onClick={
                setIsChecked &&
                (() => {
                  setIsChecked(false);
                })
              }
            >
              SHOP
            </a>
          </Link>
        </li>
        <li
          className={`${classes.item} ${
            active === '/products/gallery' && classes.active
          }`}
        >
          <Link href="/products/gallery">
            <a
              onClick={
                setIsChecked &&
                (() => {
                  setIsChecked(false);
                })
              }
            >
              GALLERY
            </a>
          </Link>
        </li>
        {!user ? (
          <>
            <li
              className={`${classes.item} ${classes.mobile}  ${
                active === '/register' && classes.active
              }`}
            >
              <Link className={classes.link} href="/register">
                <a
                  onClick={
                    setIsChecked &&
                    (() => {
                      setIsChecked(false);
                    })
                  }
                >
                  REGISTER
                </a>
              </Link>
            </li>
            <li
              className={`${classes.item} ${classes.mobile}  ${
                active === '/login' && classes.active
              }`}
            >
              <Link className={classes.link} href="/login">
                <a
                  onClick={
                    setIsChecked &&
                    (() => {
                      setIsChecked(false);
                    })
                  }
                >
                  LOGIN
                </a>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li
              className={`${classes.item} ${classes.mobile}  ${
                active === '/auth/logout' && classes.active
              }`}
            >
              <Link className={classes.link} href="/auth/logout">
                <a
                  onClick={
                    setIsChecked &&
                    (() => {
                      setIsChecked(false);
                    })
                  }
                >
                  Logout
                </a>
              </Link>
            </li>
            <li
              className={`${classes.item} ${classes.mobile}  ${
                active === '/auth/profile' && classes.active
              }`}
            >
              <Link className={classes.link} href="/auth/profile">
                <a
                  onClick={
                    setIsChecked &&
                    (() => {
                      setIsChecked(false);
                    })
                  }
                >
                  {user.firstName}
                </a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

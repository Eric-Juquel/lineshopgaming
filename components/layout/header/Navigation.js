import { useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './Navigation.module.scss';

const Navigation = ({ setIsChecked }) => {
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
      </ul>
    </nav>
  );
};

export default Navigation;

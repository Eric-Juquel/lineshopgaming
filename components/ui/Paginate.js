import React from 'react';
import Link from 'next/link';
import classes from './Paginate.module.scss';

const Paginate = ({
  label,
  pages,
  page,
  itemsPerPage,
  totalItems,
  isAdmin = false,
  keyword = '',
  sort='',
  order=null,
  scrollToTop,
}) => {
  return (
    pages > 1 && (
      <div className={classes.pages}>
        {[...Array(pages).keys()].map((p) => (
          <Link
            key={p + 1}
            href={
              label === 'products'
                ? keyword
                  ? `/products/search/${keyword}/?page=${p + 1}`
                  : `/products?page=${p + 1}`
                : label === 'productsList'
                ? `/admin/products?sort=${sort}&order=${order}&page=${p + 1}`
                : label === 'orders'
                ? `/admin/orders?page=${p + 1}`
                : label === 'users'
                ? `/admin/users?page=${p + 1}`
                : '/'
            }
          >
            <a
              className={`${classes.link} ${
                p + 1 === page ? classes.active : classes.inactive
              }`}
              onClick={() => scrollToTop()}
            >
              {p + 1}
            </a>
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;

import React from 'react';
import Link from 'next/link';
import classes from './Paginate.module.scss';

const Paginate = ({
  items,
  pages,
  page,
  itemsPerPage,
  totalItems,
  isAdmin = false,
  keyword = '',
  scrollToTop,
}) => {
  return (
    pages > 1 && (
      <div className={classes.pages}>
        {[...Array(pages).keys()].map((p) => (
          <Link
            key={p + 1}
            href={
              items === 'products'
                ? !isAdmin
                  ? keyword
                    ? `/products/search/${keyword}/?page=${p + 1}`
                    : `/products?page=${p + 1}`
                  : `/admin/productlist?page=${p + 1}`
                : items === 'orders'
                ? `/admin/orders?page=${p + 1}`
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

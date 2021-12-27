import { useEffect, useState } from 'react';
import Link from 'next/link';

import classes from './AdminScreen.module.scss';
import AdminTable from './AdminTable';
import Spinner from '../ui/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/actions/productActions';

import { toast } from 'react-toastify';
import { FaPlusCircle } from 'react-icons/fa';

const ProductsScreen = () => {
  const dispatch = useDispatch();

  const [sort, setSort] = useState('');

  const {
    products,
    resPerPage,
    productsCount,
    currentPage,
    numOfPages,
    error,
    loading,
  } = useSelector((state) => state.productsList);

  useEffect(() => {
    if (sort) {
      products.map((product) => console.log(product[sort]));
    }
  }, [sort]);

  const raws = products.map((product) => {
    return [
      { key: 'id', type: 'string', label: 'ID', value: product._id },
      { key: 'name', type: 'string', label: 'NAME', value: product.name },
      {
        key: 'createdAt',
        type: 'date',
        label: 'DATE',
        value: product.createdAt,
      },
      { key: 'price', type: 'price', label: 'PRICE', value: product.price },
      {
        key: 'updatedAt',
        type: 'date',
        label: 'UPDATED',
        value: product.updatedAt,
      },
      {
        key: 'countInStock',
        type: 'string',
        label: 'STOCK',
        value: product.countInStock,
      },
    ];
  });

  const productsTableFormat = {
    title: 'products',
    link: 'admin/products',
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
      <div className={classes.productsHeader}>
        <h1>Products</h1>
        <Link href="/admin/products/create">
          <a className={classes.createBtn}>
            <FaPlusCircle />
            NEW PRODUCT
          </a>
        </Link>
      </div>

      <div className={classes.products}>
        {loading ? (
          <Spinner />
        ) : (
          <AdminTable
            items={productsTableFormat}
            label="productsList"
            resPerPage={resPerPage}
            itemsCount={productsCount}
            currentPage={currentPage}
            numOfPages={numOfPages}
            setSort={setSort}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsScreen;

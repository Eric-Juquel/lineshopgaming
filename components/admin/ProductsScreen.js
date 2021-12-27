import { useEffect, useState } from 'react';
import Link from 'next/link';

import classes from './AdminScreen.module.scss';
import AdminTable from './AdminTable';
import Spinner from '../ui/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/actions/productActions';

import { toast } from 'react-toastify';
import { FaPlusCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState(-1)

  const {
    products,
    resPerPage,
    productsCount,
    currentPage,
    numOfPages,
    error,
    loading,
  } = useSelector((state) => state.productsList);

  const raws = products && products.map((product) => {
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
    raws:raws || [],
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (sort && order) {
      router.push(`/admin/products?sort=${sort}&order=${order}`);
    }
  }, [dispatch, error, sort, order]);

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
            sort={sort}
            order={order}
            setOrder={setOrder}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsScreen;

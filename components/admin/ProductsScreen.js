import { useEffect } from 'react';

import classes from './AdminScreen.module.scss';
import AdminTable from './AdminTable';
import Spinner from '../ui/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/actions/productActions';

import { toast } from 'react-toastify';

const ProductsScreen = () => {
  const dispatch = useDispatch();

  const {
    products,
    resPerPage,
    productsCount,
    currentPage,
    numOfPages,
    error,
    loading,
  } = useSelector((state) => state.productsList);

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
        key: 'actions',
        type: 'action',
        label: 'ACTIONS',
        value: ['update', 'delete'],
      },
    ];
  });

  const productsTableFormat = {
    title: 'products',
    link: 'products',
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
      <h1>Products</h1>
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
          />
        )}
      </div>
    </div>
  );
};

export default ProductsScreen;

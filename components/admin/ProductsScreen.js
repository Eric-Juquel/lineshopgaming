import { useEffect, useRef } from 'react';

import classes from './AdminScreen.module.scss';
import AdminProducts from './AdminProducts';
import Spinner from '../ui/Spinner';

import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const {
    products,
    resPerPage,
    productsCount,
    currentPage,
    numOfPages,
    error,
    loading,
  } = useSelector((state) => state.productsList);

  const cellsRaw = [
    { label: 'ID' },
    { label: 'NAME', value: 'name' },
    { label: 'DATE', value: 'cretaedAt' },
    { label: 'PRICE', value: 'price' },
    { label: 'UPDATED', value: 'updatedAt' },
    { label: 'ACTIONS' },
  ];

  const productsRaws = products.map(product => {
      return {
          id:{
              type:"string",
              value:product._id
          },
          name:{
              type:"string",
              value:product.name
          },
          createdAt:{
              type:"date",
              value:product.createdAt
          },
          price:{
              type:"price",
              value:product.price
          },
          updatedAt:{
              type:"date",
              value:product.updatedAt
          },
          actions:{
              type:"action",
              value:["update", "delete"]
          }
      }
  })

  

  const productsTableFormat = {
    title: 'Products',
    productsRaws
  };

console.log(productsTableFormat)

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div className={classes.container} ref={containerRef}>
      <h1>Products</h1>
      <div className={classes.products}>
        {loading ? (
          <Spinner />
        ) : (
          <AdminProducts
            items={productsTableFormat}
            cellsRaw={cellsRaw}
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

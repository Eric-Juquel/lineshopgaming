import { useState, useEffect } from 'react';
import classes from './ProductFormScreen.module.scss';

import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import TextField from '../forms/TextField';
import TextareaField from '../forms/Textarea';
import UploadField from '../forms/UploadField';

import Spinner from '../ui/Spinner';
import ErrorComponent from '../ui/ErrorComponent';
import BackBtn from '../ui/BackBtn';

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createProduct } from '../../redux/actions/productActions';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from '../../redux/constants/productConstants';
import SelectField from '../forms/SelectField';
import { toast } from 'react-toastify';

const ProductFormScreen = ({ action, categoriesOptions }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [image, setImage] = useState();

  const { loading, success, error } = useSelector((state) => state.newProduct);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  console.log('errors', errors);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors);
    }
    if (success) {
      toast.success(success);
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
  }, [dispatch, success, error]);

  const submitHandler = (data) => {
    console.log('data', data);
    const productData = {
      name: data.name,
      price: data.price,
      brand: data.brand,
      countInStock: data.countInStock,
      category: data.category.label,
      description: data.description,
      image,
    };
    if (action === 'create') {
      dispatch(createProduct(productData));
    }
  };

  const catOptions = categoriesOptions.map((option) => {
    return {
      label: option,
      value: option,
    };
  });

  return (
    <div className={classes.container}>
      <h1>{`${action} Product`} </h1>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <div className={`${classes.formGroup} ${classes.name}`}>
          <TextField
            type="text"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Name"
            name="name"
            placeholder="Enter Name"
            mandatory={true}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.price}`}>
          <TextField
            type="number"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Price"
            name="price"
            placeholder="Enter Price"
            mandatory={true}
            step="0.01"
          />
        </div>
        <div className={`${classes.formGroup} ${classes.upload}`}>
          <UploadField
            type="file"
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            frame="portrait"
            label="Product Image"
            name="productImage"
            placeholder="Browse image file"
            mandatory={true}
            // loading={uploading}
            image=""
            setImage={setImage}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.brand}`}>
          <TextField
            type="text"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Brand"
            name="brand"
            placeholder="Enter Brand"
            mandatory={true}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.countInStock}`}>
          <TextField
            type="number"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="In Stock"
            name="countInStock"
            placeholder="In Stock"
            mandatory={true}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.category}`}>
          <SelectField
            control={control}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Category"
            name="category"
            placeholder="Enter Category"
            options={catOptions}
            menuPlacement="bottom"
            isMulti={false}
            mandatory={true}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.description}`}>
          <TextareaField
            register={register}
            error={errors}
            rows={8}
            cols={10}
            inputwidth="100%"
            inputheight="100%"
            label="Description"
            name="description"
            placeholder="Enter Description"
            mandatory={true}
          />
        </div>

        <div className={classes.btnGroup}>
          <button className={classes.submitBtn} type="submit">
            {loading ? (
              <>
                Sending... <Spinner />
              </>
            ) : (
              `${action}`
            )}
          </button>
          <div className={classes.backBtn}>
            <BackBtn />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductFormScreen;

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
import { createProduct } from '../../redux/actions/productActions';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from '../../redux/constants/productConstants';

const ProductFormScreen = ({ action }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const submitHandler = (data) => {
    console.log('data', data);
  };

  return (
    <div className={classes.container}>
      <h1>{`${action} Product`} </h1>
      <form className={classes.form} onSubmit={handleSubmit(submitHandler)}>
        <div className={`${classes.formGroup} ${classes.name}`}>
          <TextField
            type="text"
            register={register}
            // error={errors}
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
            // error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Price"
            name="price"
            placeholder="Enter Price"
            mandatory={true}
            step="0.01"
          />
        </div>
        <div className={`${classes.formGroup} ${classes.image}`}>
          <TextField
            type="text"
            register={register}
            // error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Image Url"
            name="imageUrl"
            placeholder="Enter image url"
            mandatory={false}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.upload}`}>
          <UploadField
            type="file"
            register={register}
            // error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Image File"
            name="imageFile"
            placeholder="Browse image file"
            // loading={uploading}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.brand}`}>
          <TextField
            type="text"
            register={register}
            // error={errors}
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
            // error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="In Stock"
            name="countInStock"
            placeholder="In Stock"
            mandatory={true}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.category}`}>
          <TextField
            type="text"
            register={register}
            // error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Category"
            name="category"
            placeholder="Enter Category"
            mandatory={true}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.description}`}>
          <TextareaField
            register={register}
            // error={errors}
            rows={6}
            cols={10}
            inputwidth="100%"
            inputheight="100%"
            label="Description"
            name="description"
            placeholder="Enter Description"
            mandatory={true}
          />
        </div>

        <button className={classes.submit} type="submit">
          Update
        </button>
        <div className={classes.backBtn}>
          <BackBtn />
        </div>
      </form>
    </div>
  );
};

export default ProductFormScreen;

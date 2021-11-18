import classes from './ProductDetails.module.scss';
import { useForm } from 'react-hook-form';
import SelectField from '../forms/SelectField';
import TextareaField from '../forms/Textarea';
import ErrorComponent from '../ui/ErrorComponent';
// import { createProductReview } from '../../lib/products-actions';

const ProductReviewForm = ({ product, setAddReview, setNewReview }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const ratingOptions = [
    { label: '1 - Poor', value: '1' },
    { label: '2 - Fair', value: '2' },
    { label: '3 - Good', value: '3' },
    { label: '4 - Very Good', value: '4' },
    { label: '5 - Excellent', value: '5' },
  ];

  const onCancel = (e) => {
    e.preventDefault();
    setAddReview(false);
  };

  console.log('id', product._id);

  const onSubmit = async (data) => {
    // const result = await createProductReview(product._id, {
    //   rating: data.rating.value,
    //   comment: data.comment,
    // });
    setAddReview(false);
    setNewReview(true);
  };

  return (
    <div className={classes.reviewContainer}>
      <h1>{product.name}</h1>
      <h2>Write a review</h2>
      {/* {errorProductReview && <ErrorComponent />} */}
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.formGroup}>
          <SelectField
            control={control}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Rating"
            name="rating"
            placeholder="Enter Rating"
            options={ratingOptions}
            menuPlacement="bottom"
            isMulti={false}
            mandatory={true}
          />
        </div>
        <div className={classes.formGroup}>
          <TextareaField
            register={register}
            error={errors.comment}
            rows={4}
            // cols={21}
            inputwidth="100%"
            label="Comment"
            name="comment"
            placeholder="Enter Comment"
            mandatory={false}
          />
        </div>
        <div className={classes.btnGroup}>
          <button className={classes.submit} type="submit">
            Submit
          </button>
          <button className={classes.cancel} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductReviewForm;

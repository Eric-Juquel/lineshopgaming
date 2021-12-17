import { useState } from 'react';
import classes from './CustomInputs.module.scss';
import { BsUpload } from 'react-icons/bs';
import Spinner from '../ui/Spinner';
import Image from 'next/image';

const UploadField = ({
  type,
  inputwidth,
  inputheight,
  frame,
  label,
  name,
  placeholder,
  defaultValue,
  mandatory,
  loading,
  image,
  setImage,
}) => {
  const [previewImage, setPreviewImage] = useState(null);

  

  return (
    <div
      className={classes.upload}
      style={{ width: inputwidth, height: inputheight }}
    >
      <input
        type={type}
        className={classes.input}
        id={name}
        name={name}
        accept="image/*"
        placeholder={placeholder}
        defaultValue={defaultValue ? defaultValue : ''}
        onChange={(e) => {
          if (e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage(reader.result);
              setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <button className={classes.btnUpload} onClick={(e) => e.preventDefault()}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <BsUpload />
            Upload
          </>
        )}
      </button>
      <label htmlFor={name} className={classes.label}>
        {label}
      </label>
      <div className={`${classes.previewImage} ${frame === 'rounded' ? classes.rounded : classes.portrait}`}>
        {previewImage ? (
          <img src={previewImage} />
        ) : image ? (
          <Image
            src={image}
            alt={'preview image'}
            width={35}
            height={35}
          />
        ) : null}
      </div>
    </div>
  );
};

export default UploadField;

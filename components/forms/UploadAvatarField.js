import { useState } from 'react';
import classes from './CustomInputs.module.scss';
import { BsUpload } from 'react-icons/bs';
import Spinner from '../ui/Spinner';
import Image from 'next/image';

const UploadAvatarField = ({
  type,
  register,
  inputwidth,
  inputheight,
  label,
  name,
  placeholder,
  defaultValue,
  mandatory,
  loading,
  image,
  firstName,
  setAvatar,
}) => {
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <div
      className={classes.upload}
      style={{ width: inputwidth, height: inputheight }}
    >
      <input
        // {...register(name, { required: mandatory === true ? true : false })}
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
              setAvatar(reader.result);
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
      <div className={classes.avatar}>
        {previewImage ? (
          <img src={previewImage} />
        ) : image ? (
          <Image
            src={image}
            alt={`${firstName}'s avatar`}
            width={35}
            height={35}
          />
        ) : (
          <div className={classes.noAvatar}>{firstName.substring(0, 1)}</div>
        )}
      </div>
    </div>
  );
};

export default UploadAvatarField;

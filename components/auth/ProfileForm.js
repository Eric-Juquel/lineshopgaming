import classes from './ProfileScreen.module.scss';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import TextField from '../forms/TextField';
import UploadAvatarField from '../forms/UploadAvatarField';
import { uploadAvatar } from '../../lib/user-actions';

const ProfileForm = ({ user, updateHandler, alert, setAlert }) => {
  const { register, handleSubmit, errors } = useForm();

  const { firstName, lastName, email, avatar } = user;

  const [uploading, setUploading] = useState(false);

  const onSubmit = async (data) => {
    let payload = {
      id: user._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      avatar: avatar,
      password: data.password,
    };

    if (data.avatar && data.avatar.length > 0) {
      setUploading(true);
      const imageData = await uploadAvatar(data.avatar[0]);
      payload.avatar = imageData.secure_url;
      setUploading(false);
    }

    if (data.password !== data.confirmPassword) {
      setAlert({ status: 'error', text: 'Passwords do not match' });
    } else {
      await updateHandler(payload);
    }
  };

  return (
    <>
      <div className={classes.alert}>
        {alert && <p className={alert.status}>{alert.text}</p>}
      </div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.formGroup}>
          <TextField
            type="text"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="First Name"
            name="firstName"
            placeholder="First Name"
            defaultValue={firstName}
            mandatory={true}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            type="text"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
            defaultValue={lastName}
            mandatory={true}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            type="email"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Email"
            name="email"
            placeholder="Email"
            defaultValue={email}
            mandatory={true}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.upload}`}>
          <UploadAvatarField
            type="file"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Avatar"
            name="avatar"
            placeholder="Upload Avatar"
            mandatory={false}
            loading={uploading}
            image={avatar}
            firstName={firstName}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            type="password"
            data="password"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="New Password"
            name="password"
            placeholder="New Password"
            mandatory={false}
          />
        </div>
        <div className={classes.formGroup}>
          <TextField
            type="password"
            register={register}
            error={errors}
            inputwidth="100%"
            inputheight="4rem"
            label="Confirm New Password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            mandatory={false}
          />
        </div>

        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default ProfileForm;

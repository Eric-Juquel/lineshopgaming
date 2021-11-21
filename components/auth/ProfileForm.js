import classes from './ProfileScreen.module.scss';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Spinner from '../ui/Spinner';
import TextField from '../forms/TextField';
import UploadAvatarField from '../forms/UploadAvatarField';
// import { uploadAvatar } from '../../lib/user-actions';

import { useDispatch, useSelector } from 'react-redux';
import {
  updateProfile,
  loadUser,
  clearErrors,
} from '../../redux/actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';
import { toast } from 'react-toastify';

const ProfileForm = ({ user }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const [alert, setAlert] = useState({ status: '', text: '' });

  const [uploading, setUploading] = useState(false);

  const { firstName, lastName, email } = user;
  const [avatar, setAvatar] = useState(user.avatar ? user.avatar.url : '');

  const { error, isUpdated, loading } = useSelector(
    (state) => state.updateProfile
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      setAlert(() => ({ status: 'error', text: error }));
      dispatch(clearErrors());
    }

    if (isUpdated) {
      dispatch(loadUser());
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
  }, [dispatch, isUpdated, error]);

  const updateHandler = (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      avatar: avatar,
    };

    if (data.password !== data.confirmPassword) {
      setAlert({ status: 'error', text: 'Passwords do not match' });
    } else {
      dispatch(updateProfile(userData));
    }
  };

  return (
    <>
      <div className={classes.alert}>
        {alert && <p className={alert.status}>{alert.text}</p>}
      </div>
      <form className={classes.form} onSubmit={handleSubmit(updateHandler)}>
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
            // register={register}
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
            setAvatar={setAvatar}
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

        <button className={classes.updateBtn} type="submit">{loading ? <>Updating... <Spinner /></> : 'Update'}</button>
      </form>
    </>
  );
};

export default ProfileForm;

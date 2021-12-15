import { useForm } from 'react-hook-form';
import RadioBtn from '../forms/RadioBtn';
import classes from './UserDetailsScreen.module.scss';

import { useDispatch } from 'react-redux';
import { updateUserRole } from '../../redux/actions/userActions';

const UserRoleForm = ({ userID, userRole, rolesOptions }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const submitHandler = (data) => {
    dispatch(updateUserRole(data, userID));
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={classes.radioGroup}>
        {rolesOptions.map((role) => {
          return (
            <RadioBtn
              key={role}
              register={register}
              name="userRole"
              value={role}
              label={role}
              checked={userRole === role}
            />
          );
        })}
      </div>
      <button>Update</button>
    </form>
  );
};

export default UserRoleForm;

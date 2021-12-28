import { useRef } from 'react';

import { useForm } from 'react-hook-form';
import RadioBtn from '../forms/RadioBtn';
import classes from './UserDetailsScreen.module.scss';
import Modal from '../ui/Modal';

import { useDispatch } from 'react-redux';
import { updateUserRole, deleteUser } from '../../redux/actions/userActions';
import router from 'next/router';

const UserForm = ({ user, rolesOptions }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  // Modal
  const modalRef = useRef();
  const closeModalHandler = () => {
    modalRef.current.closeModal();
  };

  const deleteHandler = (userID) => {
    dispatch(deleteUser(userID));
    modalRef.current.closeModal();
    router.back();
  };

  const submitHandler = (data) => {
    dispatch(updateUserRole(data, user._id));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={classes.updateRole}
      >
        <h1>Rôle</h1>
        <div className={classes.radioGroup}>
          {rolesOptions.map((role) => {
            return (
              <RadioBtn
                key={role}
                register={register}
                name="userRole"
                value={role}
                label={role}
                checked={user.role === role}
              />
            );
          })}
        </div>
        <button>Update</button>
      </form>
      <div className={classes.deleteAction}>
        <h1>Delete User</h1>
        <button onClick={() => modalRef.current.openModal()}>Delete</button>
      </div>
      <Modal ref={modalRef} height="20rem" width="60rem">
        <div className={classes.delete}>
          <h4>{`would you like to delete ${user.firstName} ${user.lastName} ?`}</h4>

          <button className={classes.cancel} onClick={closeModalHandler}>
            Cancel
          </button>
          <button
            className={classes.validate}
            onClick={() => deleteHandler(user._id)}
          >
            Validate
          </button>
        </div>
      </Modal>
    </>
  );
};

export default UserForm;

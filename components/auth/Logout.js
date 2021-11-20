import { useEffect, useRef } from 'react';
import { signOut } from 'next-auth/client';
import { useRouter } from 'next/router';
import classes from './Logout.module.scss';
import Modal from '../ui/Modal';

const Logout = () => {
  const router = useRouter();

  // Modal
  const modalRef = useRef();
  useEffect(() => {
    modalRef.current.openModal();
  }, []);

  const onLogout = () => {
    signOut({ callbackUrl: 'http://localhost:3000/' });
  };

  const onBack = () => {
    modalRef.current.closeModal();
    router.back();
  };

  return (
    <Modal ref={modalRef} height="20rem" width="60rem">
      <div className={classes.logout}>
        <h4>would you like to logout ?</h4>

        <button className={classes.cancel} onClick={onBack}>
          Cancel
        </button>
        <button className={classes.validate} onClick={onLogout}>
          Validate
        </button>
      </div>
    </Modal>
  );
};

export default Logout;

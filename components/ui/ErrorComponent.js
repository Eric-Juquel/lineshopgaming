import { useEffect, useRef } from "react";
import { useRouter} from "next/router";
import { IoIosReturnLeft } from "react-icons/io";
import classes from "./ErrorComponent.module.scss";
import Modal from "./Modal";

const ErrorComponent = ({ err, height = "30%", width = "50%" }) => {
  const router = useRouter();

  if (!err) {
    err = new Error("Error");
  }

  // Modal
  const modalRef = useRef();
  useEffect(() => {
    modalRef.current.openModal();
  }, []);

  const onClose = () => {
    router.back();
    modalRef.current.closeModal();
  };

  return (
    <Modal ref={modalRef} height={height} width={width}>
      <div className={classes.Error}>
        <h3>Error</h3>
        <div className={classes.message}>
          <p>{err}</p>
        </div>
        <button className={classes.modalCloseButton} onClick={onClose} title="back to last visited page">
        <IoIosReturnLeft />
          Back 
        </button>
      </div>
    </Modal>
  );
};

export default ErrorComponent;

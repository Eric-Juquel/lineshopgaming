import { useRouter } from 'next/router';
import { IoIosReturnLeft } from 'react-icons/io';
import classes from './BackBtn.module.scss';

const BackBtn = () => {
  const router = useRouter();

  const goBackHandler = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <button className={classes.backBtn} onClick={goBackHandler}>
      <IoIosReturnLeft />
      Back
    </button>
  );
};

export default BackBtn;

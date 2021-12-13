import { useRouter } from 'next/router';
import { IoIosReturnLeft } from 'react-icons/io';
import classes from './BackBtn.module.scss';

const BackBtn = () => {
  return (
    <button className={classes.backBtn}>
      <IoIosReturnLeft />
      Back
    </button>
  );
};

export default BackBtn;
